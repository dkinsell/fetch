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
  const [loadingMatch, setLoadingMatch] = useState(false);

  // Load favorite dogs whenever the favorites array changes
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
    <div style={{ padding: "1rem" }}>
      <h2>Your Favorites</h2>
      {favoriteDogs.length === 0 ? (
        <p>You have not favorited any dogs yet.</p>
      ) : (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {favoriteDogs.map((dog) => (
            <li
              key={dog.id}
              style={{ marginBottom: "1rem", borderBottom: "1px solid #ccc" }}
            >
              <h3>{dog.name}</h3>
              <p>Breed: {dog.breed}</p>
              <p>Age: {dog.age}</p>
              <p>Zip Code: {dog.zip_code}</p>
              {dog.img && (
                <img src={dog.img} alt={dog.name} style={{ width: "150px" }} />
              )}
              <br />
              <button onClick={() => handleRemoveFavorite(dog.id)}>
                Remove from Favorites
              </button>
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={handleGenerateMatch}
        disabled={favorites.length === 0 || loadingMatch}
        style={{ marginTop: "1rem" }}
      >
        {loadingMatch ? "Generating Match..." : "Generate Match"}
      </button>

      {matchDog && (
        <div
          style={{
            marginTop: "2rem",
            padding: "1rem",
            border: "1px solid #000",
          }}
        >
          <h2>Your Match</h2>
          <h3>{matchDog.name}</h3>
          <p>Breed: {matchDog.breed}</p>
          <p>Age: {matchDog.age}</p>
          <p>Zip Code: {matchDog.zip_code}</p>
          {matchDog.img && (
            <img
              src={matchDog.img}
              alt={matchDog.name}
              style={{ width: "150px" }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
