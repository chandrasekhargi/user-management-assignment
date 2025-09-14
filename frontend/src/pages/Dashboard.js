import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import UserCard from "../components/UserCard";
import './pages.css'

function Dashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/users").then((res) => setUsers(res.data));
  }, []);

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user._id !== id));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="user-details flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">User Dashboard</h1>
          <Link to="/add" className="add-user-btn bg-blue-500 text-white px-4 py-2 rounded">Add User</Link>
      </div>
      <div className="grid gap-4">
        {users.map((user) => (
          <UserCard key={user._id} user={user} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
