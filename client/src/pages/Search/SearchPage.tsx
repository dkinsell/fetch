import { FC, useState } from "react";

interface Dog {
  id: string;
  name: string;
  breed: string;
}

const SearchPage: FC = () => {
  const [breed, setBreed] = useState("");
  const [dogs, setDogs] = useState<Dog[]>([]);

  const handleSearch = () => {
    console.log(`Searching for dogs. Current breed: ${breed}`);

    const mockDogs: Dog[] = [
      { id: "1", name: "Buddy", breed: "Labrador" },
      { id: "2", name: "Max", breed: "Labrador" },
      { id: "3", name: "Bella", breed: "German Shepherd" },
    ];

    const filtered = breed
      ? mockDogs.filter((dog) => dog.breed === breed)
      : mockDogs;

    setDogs(filtered);
  };
  return (
    <div>
      <h2>Search Dogs</h2>
      <label htmlFor="breed-select">Filter by breed:</label>
      <select
        id="breed-select"
        value={breed}
        onChange={(e) => setBreed(e.target.value)}
      >
        <option value="">All breeds</option>
        <option value="Labrador">Labrador</option>
        <option value="German Shepherd">German Shepherd</option>
      </select>
      <button onClick={handleSearch}>Search</button>

      <div>
        {dogs.length === 0 ? (
          <p>No dogs found. Try different search filters!</p>
        ) : (
          dogs.map((dog) => (
            <div key={dog.id}>
              <h3>{dog.name}</h3>
              <p>Breed: {dog.breed}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchPage;
