import { FC, useEffect, useState } from "react";
import { getBreeds, searchDogs, fetchDogsByIds, getMatch } from "../../api";
import { useFavoritesContext } from "../../context/useFavoritesContext";
import SearchControls from "./SearchControls";
import PaginationControls from "./PaginationControls";
import DogList from "./DogList";

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

const SearchPage: FC = () => {
  // Favorites from global context
  const { favorites, addFavorite, removeFavorite } = useFavoritesContext();

  // Breed searching
  const [allBreeds, setAllBreeds] = useState<string[]>([]);
  const [selectedBreed, setSelectedBreed] = useState("");

  // Sorting
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Dogs & pagination
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [from, setFrom] = useState(0);
  const size = 10;
  const [total, setTotal] = useState(0);

  // Fetch all possible breeds on mount
  useEffect(() => {
    getBreeds()
      .then((breeds) => setAllBreeds(breeds))
      .catch((err) => console.error("Failed to fetch breeds:", err));
  }, []);

  // Main search function
  const handleSearch = async (newFrom = 0) => {
    try {
      const params: {
        breeds?: string[];
        size: number;
        from: number;
        sort: string;
      } = {
        size,
        from: newFrom,
        sort: `breed:${sortOrder}`,
      };

      if (selectedBreed) {
        params.breeds = [selectedBreed];
      }

      const searchResult = await searchDogs(params);
      const { resultIds, total } = searchResult;
      setTotal(total);
      setFrom(newFrom);

      const fetchedDogs = await fetchDogsByIds(resultIds);
      setDogs(fetchedDogs);
    } catch (err) {
      console.error("Failed to search dogs:", err);
    }
  };

  // Auto-research on sort change
  useEffect(() => {
    handleSearch(from);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOrder]);

  // Pagination
  const handlePrev = () => {
    const newFrom = Math.max(0, from - size);
    handleSearch(newFrom);
  };
  const handleNext = () => {
    const newFrom = from + size;
    if (newFrom < total) {
      handleSearch(newFrom);
    }
  };

  // Toggle a dog's favorite status
  const handleToggleFavorite = (dogId: string) => {
    if (favorites.includes(dogId)) {
      removeFavorite(dogId);
    } else {
      addFavorite(dogId);
    }
  };

  // Generate match from favorites
  const handleGenerateMatch = async () => {
    try {
      const matchId = await getMatch(favorites);
      const [matchedDog] = await fetchDogsByIds([matchId]);
      alert(`Your match is: ${matchedDog.name}, a ${matchedDog.breed}!`);
    } catch (err) {
      console.error("Failed to generate match:", err);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Search Dogs</h2>

      {/* Search Controls (Breed filter, Sort, Search) */}
      <SearchControls
        allBreeds={allBreeds}
        selectedBreed={selectedBreed}
        onBreedChange={(b) => setSelectedBreed(b)}
        sortOrder={sortOrder}
        onSortChange={(o) => setSortOrder(o)}
        onSearch={() => handleSearch(0)}
      />

      {/* Generate Match Button */}
      <button
        onClick={handleGenerateMatch}
        disabled={favorites.length === 0}
        style={{ marginTop: "1rem" }}
      >
        Generate Match
      </button>

      {/* Pagination Controls */}
      <PaginationControls
        from={from}
        size={size}
        total={total}
        onPrev={handlePrev}
        onNext={handleNext}
      />

      {/* Dog List */}
      <DogList
        dogs={dogs}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  );
};

export default SearchPage;
