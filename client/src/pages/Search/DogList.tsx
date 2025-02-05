import { Dog } from "../../types";
import DogCard from "../../components/DogCard";

interface DogListProps {
  dogs: Dog[];
  favorites: string[];
  onToggleFavorite: (dogId: string) => void;
}

// Component that displays a list of dogs and allows the user to add or remove them from their favorites
const DogList = ({ dogs, favorites, onToggleFavorite }: DogListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {/* Map through the dogs and render a DogCard for each */}
      {dogs.map((dog) => (
        <DogCard
          key={dog.id}
          dog={dog}
          buttonText={
            favorites.includes(dog.id) ? "Remove Favorite" : "Add Favorite"
          }
          onAction={() => onToggleFavorite(dog.id)}
        />
      ))}
    </div>
  );
};

export default DogList;
