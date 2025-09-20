import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

function Trades({ user }) {
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    const fetchTrades = async () => {
      const q = query(collection(db, "trades"), where("uid", "==", user.uid));
      const snap = await getDocs(q);
      setTrades(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchTrades();
  }, [user]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">My Trades</h1>
      <table className="mt-4 w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Symbol</th>
            <th className="p-2 border">Entry</th>
            <th className="p-2 border">Exit</th>
            <th className="p-2 border">P&L</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((t) => (
            <tr key={t.id}>
              <td className="p-2 border">{t.symbol}</td>
              <td className="p-2 border">{t.entry}</td>
              <td className="p-2 border">{t.exit}</td>
              <td className={`p-2 border ${t.pnl >= 0 ? "text-green-600" : "text-red-600"}`}>
                {t.pnl}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Trades;
