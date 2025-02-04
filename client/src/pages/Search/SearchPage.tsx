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

  // Filter and sorting states
  const [allBreeds, setAllBreeds] = useState<string[]>([]);
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [sortField, setSortField] = useState<"breed" | "name" | "age">("breed");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [ageMin, setAgeMin] = useState<number | undefined>(undefined);
  const [ageMax, setAgeMax] = useState<number | undefined>(undefined);
  const [zipCodes, setZipCodes] = useState<string>("");

  // Search results and pagination
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [from, setFrom] = useState(0);
  const size = 10;
  const [total, setTotal] = useState(0);

  // UI states
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [matchLoading, setMatchLoading] = useState<boolean>(false);
  const [matchDog, setMatchDog] = useState<Dog | null>(null);

  // Fetch available breeds on mount
  useEffect(() => {
    getBreeds()
      .then((breeds) => setAllBreeds(breeds))
      .catch((err) => console.error("Failed to fetch breeds:", err));
  }, []);

  const handleSearch = async (newFrom = 0) => {
    setLoading(true);
    setError(null);
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
        sort: `${sortField}:${sortOrder}`,
      };

      if (selectedBreeds.length > 0) {
        params.breeds = selectedBreeds;
      }
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
      setError("Failed to search dogs. Please try again.");
    } finally {
      setLoading(false);
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

  useEffect(() => {
    handleSearch(from);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortField, sortOrder]);

  const handleToggleFavorite = (dogId: string) => {
    if (favorites.includes(dogId)) {
      removeFavorite(dogId);
    } else {
      addFavorite(dogId);
    }
  };

  const handleGenerateMatch = async () => {
    if (favorites.length === 0) return;
    setMatchLoading(true);
    setError(null);
    try {
      const matchId = await getMatch(favorites);
      const [matchedDog] = await fetchDogsByIds([matchId]);
      setMatchDog(matchedDog);
    } catch (err) {
      console.error("Failed to generate match:", err);
      setError("Failed to generate match. Please try again.");
    } finally {
      setMatchLoading(false);
    }
  };

  const handleResetFilters = () => {
    setSelectedBreeds([]);
    setAgeMin(undefined);
    setAgeMax(undefined);
    setZipCodes("");
    handleSearch(0);
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Search Dogs</h2>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      {/* Filtering & Sorting Controls Section */}
      <div className="mb-6">
        <SearchControls
          allBreeds={allBreeds}
          selectedBreeds={selectedBreeds}
          onBreedChange={setSelectedBreeds}
          sortField={sortField}
          onSortFieldChange={setSortField}
          sortOrder={sortOrder}
          onSortOrderChange={setSortOrder}
          onSearch={() => handleSearch(0)}
          onResetFilters={handleResetFilters}
          ageMin={ageMin}
          ageMax={ageMax}
          onAgeMinChange={setAgeMin}
          onAgeMaxChange={setAgeMax}
          zipCodes={zipCodes}
          onZipCodesChange={setZipCodes}
        />
      </div>
      {/* Action Buttons */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handleGenerateMatch}
          disabled={favorites.length === 0 || matchLoading}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          {matchLoading ? "Generating Match..." : "Generate Match"}
        </button>
        {loading && <span className="text-gray-700">Loading results...</span>}
      </div>
      {/* Pagination Controls */}
      <div className="mb-6">
        <PaginationControls
          from={from}
          size={size}
          total={total}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      </div>
      {/* Dog List Section */}
      <DogList
        dogs={dogs}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
      />
      {/* Match Result Section */}
      {matchDog && (
        <div className="mt-8 p-4 border border-gray-800 text-center rounded">
          <h2 className="text-2xl font-bold mb-2">Your Match</h2>
          <h3 className="text-xl font-semibold">{matchDog.name}</h3>
          <p className="text-gray-700">Breed: {matchDog.breed}</p>
          <p className="text-gray-700">Age: {matchDog.age}</p>
          <p className="text-gray-700">ZIP: {matchDog.zip_code}</p>
          {matchDog.img && (
            <img
              src={matchDog.img}
              alt={matchDog.name}
              className="w-40 mx-auto mt-4 rounded"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
