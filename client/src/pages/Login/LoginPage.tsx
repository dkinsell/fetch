import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/User/useUserContext";
import { login } from "../../api";
import FormField from "../../components/FormField";

// This component displays a login form and handles user authentication
const LoginPage = () => {
  // Use the navigate hook to redirect the user to the search page after login
  const navigate = useNavigate();
  // Use the setUserInfo function from the UserContext to set the user's name and email in the context
  const { setUserInfo } = useUserContext();

  // Use the useState hook to manage the form fields and error state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Handle the form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(name, email);
      setUserInfo(name, email);
      navigate("/search");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        {/* Display the error message if it exists */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {/* Form for login */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            id="name"
            label="Name:"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <FormField
            id="email"
            label="Email:"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
