import { FC } from "react";

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

interface DogListProps {
  dogs: Dog[];
  favorites: string[];
  onToggleFavorite: (dogId: string) => void;
}

const DogList: FC<DogListProps> = ({ dogs, favorites, onToggleFavorite }) => {
  return (
    <ul style={{ listStyleType: "none", padding: 0, marginTop: "1rem" }}>
      {dogs.map((dog) => {
        const isFav = favorites.includes(dog.id);

        return (
          <li
            key={dog.id}
            style={{ marginBottom: "1rem", borderBottom: "1px solid #ccc" }}
          >
            <h3>{dog.name}</h3>
            <p>Breed: {dog.breed}</p>
            <p>Age: {dog.age}</p>
            <p>Zip Code: {dog.zip_code}</p>
            {dog.img && (
              <img src={dog.img} alt={dog.name} style={{ width: 150 }} />
            )}

            <button onClick={() => onToggleFavorite(dog.id)}>
              {isFav ? "Remove from Favorites" : "Add to Favorites"}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default DogList;
