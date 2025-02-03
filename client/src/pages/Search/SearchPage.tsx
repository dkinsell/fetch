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

  // All possible breeds and multi-select state
  const [allBreeds, setAllBreeds] = useState<string[]>([]);
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);

  // Advanced sorting state
  const [sortField, setSortField] = useState<"breed" | "name" | "age">("breed");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Age range filtering state
  const [ageMin, setAgeMin] = useState<number | undefined>(undefined);
  const [ageMax, setAgeMax] = useState<number | undefined>(undefined);

  // Location filtering state (ZIP codes as comma-separated string)
  const [zipCodes, setZipCodes] = useState<string>("");

  // Dogs and pagination state
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [from, setFrom] = useState(0);
  const size = 10;
  const [total, setTotal] = useState(0);

  // Fetch the list of breeds on mount
  useEffect(() => {
    getBreeds()
      .then((breeds) => setAllBreeds(breeds))
      .catch((err) => console.error("Failed to fetch breeds:", err));
  }, []);

  /**
   * Main search function:
   * Incorporates multi-select breeds, age range, location, and advanced sorting.
   */
  const handleSearch = async (newFrom = 0) => {
    try {
      const params: {
        breeds?: string[];
        zipCodes?: string[];
        ageMin?: number;
        ageMax?: number;
        size: number;
        from: number;
        sort: string;
      } = {
        size,
        from: newFrom,
        sort: `${sortField}:${sortOrder}`, // Use the selected sort field and order
      };

      if (selectedBreeds.length > 0) {
        params.breeds = selectedBreeds;
      }

      // Process ZIP codes if provided
      if (zipCodes.trim() !== "") {
        params.zipCodes = zipCodes
          .split(",")
          .map((z) => z.trim())
          .filter((z) => z !== "");
      }

      if (ageMin !== undefined) {
        params.ageMin = ageMin;
      }
      if (ageMax !== undefined) {
        params.ageMax = ageMax;
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

  // Pagination handlers
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

  // Re-run search when sort field or sort order changes
  useEffect(() => {
    handleSearch(from);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortField, sortOrder]);

  // Reset filters to their default values and re-run the search
  const handleResetFilters = () => {
    setSelectedBreeds([]);
    setAgeMin(undefined);
    setAgeMax(undefined);
    setZipCodes("");
    // Optionally, you can also reset sortField and sortOrder to defaults:
    // setSortField('breed');
    // setSortOrder('asc');
    handleSearch(0);
  };

  // Toggle a dog's favorite status
  const handleToggleFavorite = (dogId: string) => {
    if (favorites.includes(dogId)) {
      removeFavorite(dogId);
    } else {
      addFavorite(dogId);
    }
  };

  // Generate a match from favorites
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

      {/* Search Controls with multi-select, age range, location, sorting, and filter reset */}
      <SearchControls
        allBreeds={allBreeds}
        selectedBreeds={selectedBreeds}
        onBreedChange={(breeds) => setSelectedBreeds(breeds)}
        sortField={sortField}
        onSortFieldChange={(field) => setSortField(field)}
        sortOrder={sortOrder}
        onSortOrderChange={(order) => setSortOrder(order)}
        onSearch={() => handleSearch(0)}
        onResetFilters={handleResetFilters}
        ageMin={ageMin}
        ageMax={ageMax}
        onAgeMinChange={setAgeMin}
        onAgeMaxChange={setAgeMax}
        zipCodes={zipCodes}
        onZipCodesChange={setZipCodes}
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
