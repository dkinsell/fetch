import { useEffect, useState } from "react";
import { getBreeds, searchDogs, fetchDogsByIds } from "../../api";
import { useFavoritesContext } from "../../context/useFavoritesContext";
import SearchControls from "./SearchControls";
import PaginationControls from "./PaginationControls";
import DogList from "./DogList";
import { Dog } from "../../types";

const SearchPage = () => {
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
  const [error, setError] = useState<string | null>(null);

  // Fetch available breeds on mount
  useEffect(() => {
    getBreeds()
      .then((breeds) => setAllBreeds(breeds))
      .catch((err) => console.error("Failed to fetch breeds:", err));
  }, []);

  const handleSearch = async (newFrom = 0) => {
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
    </div>
  );
};

export default SearchPage;
