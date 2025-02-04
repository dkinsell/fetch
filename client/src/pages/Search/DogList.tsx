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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {dogs.map((dog) => {
        const isFav = favorites.includes(dog.id);
        return (
          <div
            key={dog.id}
            className="border rounded-lg p-4 shadow-sm flex flex-col"
          >
            <h3 className="text-lg font-semibold mb-1">{dog.name}</h3>
            <p className="text-gray-700">Breed: {dog.breed}</p>
            <p className="text-gray-700">Age: {dog.age}</p>
            <p className="text-gray-700">ZIP: {dog.zip_code}</p>
            {dog.img && (
              <img
                src={dog.img}
                alt={dog.name}
                className="w-full h-40 object-cover my-2 rounded"
              />
            )}
            <button
              onClick={() => onToggleFavorite(dog.id)}
              className={`mt-auto py-2 rounded ${
                isFav
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-500 hover:bg-green-600"
              } text-white transition`}
            >
              {isFav ? "Remove Favorite" : "Add Favorite"}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default DogList;
