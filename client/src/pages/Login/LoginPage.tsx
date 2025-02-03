import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/useUserContext";
import { login } from "../../api";

const LoginPage: FC = () => {
  const navigate = useNavigate();

  const { setUserInfo } = useUserContext();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

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
    }
  };

  return (
    <div>
      <h2>Login</h2>

      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default LoginPage;
