import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddTrade from "./pages/AddTrade";
import Trades from "./pages/Trades";
import { auth, provider } from "./firebase";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="p-4 bg-white shadow flex justify-between">
          <Link to="/" className="font-bold">Trading Journal</Link>
          <div>
            {user ? (
              <>
                <span className="mr-4">{user.displayName}</span>
                <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>
              </>
            ) : (
              <button onClick={handleLogin} className="bg-blue-500 text-white px-3 py-1 rounded">Login</button>
            )}
          </div>
        </nav>
        {user ? (
          <Routes>
            <Route path="/" element={<Dashboard user={user} />} />
            <Route path="/add" element={<AddTrade user={user} />} />
            <Route path="/trades" element={<Trades user={user} />} />
          </Routes>
        ) : (
          <div className="p-8 text-center text-gray-700">
            <h1 className="text-2xl font-bold">Welcome to Trading Journal</h1>
            <p>Please login to continue.</p>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
