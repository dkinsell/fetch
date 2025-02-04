import { useEffect, useState } from "react";
import { fetchDogsByIds, getMatch } from "../../api";
import { useNavigate } from "react-router-dom";
import { useFavoritesContext } from "../../context/useFavoritesContext";
import { Dog } from "../../types";

const FavoritesPage = () => {
  const { favorites, removeFavorite } = useFavoritesContext();
  const navigate = useNavigate();
  const [favoriteDogs, setFavoriteDogs] = useState<Dog[]>([]);
  const [matchDog, setMatchDog] = useState<Dog | null>(null);
  const [loadingMatch, setLoadingMatch] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFavorites = async () => {
      if (favorites.length > 0) {
        try {
          const dogs = await fetchDogsByIds(favorites);
          setFavoriteDogs(dogs);
        } catch (err) {
          console.error("Failed to load favorite dogs", err);
          setError("Failed to load favorites.");
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
    setError(null);
    try {
      const matchId = await getMatch(favorites);
      const [dog] = await fetchDogsByIds([matchId]);
      setMatchDog(dog);
    } catch (err) {
      console.error("Failed to generate match", err);
      setError("Failed to generate match. Please try again.");
    } finally {
      setLoadingMatch(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-6">
      {/* Header */}
      <header className="mb-12 text-center">
        <h2 className="text-4xl font-bold text-slate-800 mb-2">
          Your Favorites
        </h2>
        <p className="text-slate-600">
          {favorites.length} beloved companion{favorites.length !== 1 && "s"}
        </p>
      </header>

      {/* Error Message */}
      {error && (
        <div className="max-w-4xl mx-auto mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center">
          {error}
        </div>
      )}

      {/* Favorites Grid */}
      {favoriteDogs.length === 0 ? (
        <div className="max-w-4xl mx-auto text-center p-12 bg-white rounded-xl shadow-sm mb-12">
          <p className="text-slate-500 text-lg">
            No favorites yet. Fall in love with some pups and they'll appear
            here!
          </p>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {favoriteDogs.map((dog) => (
            <div
              key={dog.id}
              className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 ease-out"
            >
              <div className="p-5">
                <div className="w-full h-64 overflow-hidden rounded-lg relative bg-white border border-slate-200">
                  {dog.img && (
                    <img
                      src={dog.img}
                      alt={dog.name}
                      className="block w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="pt-4">
                  <h3 className="text-xl font-semibold text-slate-800 mb-1">
                    {dog.name}
                  </h3>
                  <div className="flex flex-wrap gap-2 text-sm text-slate-600">
                    <span className="bg-slate-100 px-2 py-1 rounded-md">
                      {dog.breed}
                    </span>
                    <span className="bg-slate-100 px-2 py-1 rounded-md">
                      Age: {dog.age}
                    </span>
                    <span className="bg-slate-100 px-2 py-1 rounded-md">
                      ZIP: {dog.zip_code}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleRemoveFavorite(dog.id)}
                className="w-full mt-4 py-3 bg-white border-t border-slate-100 text-rose-600 font-medium hover:bg-rose-50 transition-colors duration-200 rounded-b-xl"
              >
                Remove from Favorites
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Match Section */}
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <button
            onClick={handleGenerateMatch}
            disabled={favorites.length === 0 || loadingMatch}
            className={`px-8 py-3 rounded-lg font-medium transition-all ${
              favorites.length === 0 || loadingMatch
                ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
          >
            {loadingMatch ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Finding Your Match...
              </span>
            ) : (
              "✨ Generate Your Perfect Match"
            )}
          </button>
        </div>

        {matchDog && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border-2 border-indigo-100">
            <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
              🎉 Your Ideal Companion!
            </h2>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-full md:w-1/3">
                <div className="w-full h-64 overflow-hidden rounded-xl relative bg-white border border-slate-200">
                  {matchDog.img && (
                    <img
                      src={matchDog.img}
                      alt={matchDog.name}
                      className="block w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>
              <div className="w-full md:w-2/3 space-y-4">
                <h3 className="text-3xl font-bold text-slate-800">
                  {matchDog.name}
                </h3>
                <div className="space-y-2">
                  <p className="text-lg text-slate-600">
                    <span className="font-medium">Breed:</span> {matchDog.breed}
                  </p>
                  <p className="text-lg text-slate-600">
                    <span className="font-medium">Age:</span> {matchDog.age}{" "}
                    years
                  </p>
                  <p className="text-lg text-slate-600">
                    <span className="font-medium">Location:</span> ZIP{" "}
                    {matchDog.zip_code}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <button
                onClick={() => navigate("/adopt")}
                className="px-8 py-3 rounded-lg font-medium bg-teal-600 hover:bg-teal-700 text-white transition"
              >
                Ready to Adopt?
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
