import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

function AddTrade({ user }) {
  const [symbol, setSymbol] = useState("");
  const [entry, setEntry] = useState("");
  const [exit, setExit] = useState("");
  const [pnl, setPnl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "trades"), {
        uid: user.uid,
        symbol,
        entry: parseFloat(entry),
        exit: parseFloat(exit),
        pnl: parseFloat(pnl),
        createdAt: Timestamp.now()
      });
      setSymbol(""); setEntry(""); setExit(""); setPnl("");
      alert("Trade added!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Add Trade</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <input className="border p-2 w-full" placeholder="Symbol" value={symbol} onChange={(e) => setSymbol(e.target.value)} />
        <input className="border p-2 w-full" placeholder="Entry Price" type="number" value={entry} onChange={(e) => setEntry(e.target.value)} />
        <input className="border p-2 w-full" placeholder="Exit Price" type="number" value={exit} onChange={(e) => setExit(e.target.value)} />
        <input className="border p-2 w-full" placeholder="P&L" type="number" value={pnl} onChange={(e) => setPnl(e.target.value)} />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Save Trade</button>
      </form>
    </div>
  );
}

export default AddTrade;
