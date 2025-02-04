import { FC, useEffect, useState } from "react";
import { fetchDogsByIds, getMatch } from "../../api";
import { useFavoritesContext } from "../../context/useFavoritesContext";

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

const FavoritesPage: FC = () => {
  const { favorites, removeFavorite } = useFavoritesContext();
  const [favoriteDogs, setFavoriteDogs] = useState<Dog[]>([]);
  const [matchDog, setMatchDog] = useState<Dog | null>(null);
  const [loadingMatch, setLoadingMatch] = useState<boolean>(false);

  // Load favorite dogs whenever favorites change
  useEffect(() => {
    const loadFavorites = async () => {
      if (favorites.length > 0) {
        try {
          const dogs = await fetchDogsByIds(favorites);
          setFavoriteDogs(dogs);
        } catch (err) {
          console.error("Failed to load favorite dogs", err);
        }
      } else {
        setFavoriteDogs([]);
      }
    };
    loadFavorites();
  }, [favorites]);

  const handleRemoveFavorite = (dogId: string) => {
    removeFavorite(dogId);
  };

  const handleGenerateMatch = async () => {
    if (favorites.length === 0) return;
    setLoadingMatch(true);
    try {
      const matchId = await getMatch(favorites);
      const [dog] = await fetchDogsByIds([matchId]);
      setMatchDog(dog);
    } catch (err) {
      console.error("Failed to generate match", err);
    } finally {
      setLoadingMatch(false);
    }
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Favorites</h2>
      {favoriteDogs.length === 0 ? (
        <p className="text-center text-gray-600">
          You have not favorited any dogs yet.
        </p>
      ) : (
        <ul className="space-y-4">
          {favoriteDogs.map((dog) => (
            <li key={dog.id} className="border-b border-gray-300 pb-4">
              <h3 className="text-xl font-semibold">{dog.name}</h3>
              <p className="text-gray-700">Breed: {dog.breed}</p>
              <p className="text-gray-700">Age: {dog.age}</p>
              <p className="text-gray-700">Zip Code: {dog.zip_code}</p>
              {dog.img && (
                <img src={dog.img} alt={dog.name} className="w-40 mt-2" />
              )}
              <button
                onClick={() => handleRemoveFavorite(dog.id)}
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove from Favorites
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-6 flex flex-col items-center">
        <button
          onClick={handleGenerateMatch}
          disabled={favorites.length === 0 || loadingMatch}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {loadingMatch ? "Generating Match..." : "Generate Match"}
        </button>
        {matchDog && (
          <div className="mt-6 p-4 border border-gray-800 text-center">
            <h2 className="text-2xl font-bold mb-2">Your Match</h2>
            <h3 className="text-xl font-semibold">{matchDog.name}</h3>
            <p className="text-gray-700">Breed: {matchDog.breed}</p>
            <p className="text-gray-700">Age: {matchDog.age}</p>
            <p className="text-gray-700">Zip Code: {matchDog.zip_code}</p>
            {matchDog.img && (
              <img
                src={matchDog.img}
                alt={matchDog.name}
                className="w-40 mt-2 mx-auto"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
