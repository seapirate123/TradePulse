import React from "react";

function Dashboard({ user }) {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <p>Welcome {user.displayName}, here’s your trading performance summary.</p>
    </div>
  );
}

export default Dashboard;
