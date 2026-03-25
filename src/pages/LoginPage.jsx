import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/userApi";
import { useApp } from "../context/AppContext";

export default function LoginPage() {
  const { setUser } = useApp();
  const navigate = useNavigate();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); 

    setError(""); 

    if (!email || !password) {
      setError("Please enter email and password"); 
      return;
    }

    try {
      console.log("Trying login:", email, password); 

      const res = await loginUser({ email, password });

      console.log("Login success:", res); 

      setUser(res.data);
      navigate("/users");
    } catch (err) {
      console.log("Login error:", err); 
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-2">Sign In</h2>

          {error && <div className="alert alert-error text-sm">{error}</div>}

          <form onSubmit={handleLogin} className="flex flex-col gap-2">
            <input id = "email" name = "email"
              className="input input-bordered"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />

            <input id = "password" name = "password"
              className="input input-bordered"
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            <button className="btn btn-primary mt-2" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}