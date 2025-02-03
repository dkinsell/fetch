import { FC, useEffect, useState } from "react";
import { getBreeds, searchDogs, fetchDogsByIds } from "../../api";

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

const SearchPage: FC = () => {
  const [allBreeds, setAllBreeds] = useState<string[]>([]);
  const [selectedBreed, setSelectedBreed] = useState("");

  const [breedSortOrder, setBreedSortOrder] = useState<"asc" | "desc">("asc");

  const [dogs, setDogs] = useState<Dog[]>([]);
  const [from, setFrom] = useState(0);
  const size = 10;
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getBreeds()
      .then((breeds) => setAllBreeds(breeds))
      .catch((err) => console.error("Failed to fetch breeds:", err));
  }, []);

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
        sort: `breed:${breedSortOrder}`,
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
  }, [breedSortOrder]);

  return (
    <div>
      <h2>Search Dogs</h2>

      <label htmlFor="breed-select">Breed: </label>
      <select
        id="breed-select"
        value={selectedBreed}
        onChange={(e) => {
          setSelectedBreed(e.target.value);
        }}
      >
        <option value="">All Breeds</option>
        {allBreeds.map((b) => (
          <option key={b} value={b}>
            {b}
          </option>
        ))}
      </select>

      <label htmlFor="breed-sort-select">Sort by Breed: </label>
      <select
        id="breed-sort-select"
        value={breedSortOrder}
        onChange={(e) => setBreedSortOrder(e.target.value as "asc" | "desc")}
      >
        <option value="asc">Ascending (A → Z)</option>
        <option value="desc">Descending (Z → A)</option>
      </select>

      <button onClick={() => handleSearch(0)}>Search</button>

      <div>
        <p>Total results: {total}</p>
        <button onClick={handlePrev} disabled={from === 0}>
          Prev
        </button>
        <button onClick={handleNext} disabled={from + size >= total}>
          Next
        </button>
      </div>

      <ul>
        {dogs.map((dog) => (
          <li key={dog.id}>
            <h3>{dog.name}</h3>
            <p>Breed: {dog.breed}</p>
            <p>Age: {dog.age}</p>
            <p>Zip Code: {dog.zip_code}</p>
            {dog.img && <img src={dog.img} alt={dog.name} />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPage;
