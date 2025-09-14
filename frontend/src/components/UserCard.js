import { Link } from "react-router-dom";
import axios from "axios";
import '../pages/pages.css'

function UserCard({ user, onDelete }) {
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios.delete(`http://localhost:5000/api/users/${user._id}`).then(() => onDelete(user._id));
    }
  };

  return (
    <div className="bg-white shadow rounded p-4 flex justify-between items-center">
      <div className="user-details">
        <h3 className="text-lg font-semibold">Name: {user.name}</h3>
        <p className="text-sm text-gray-600"><span className="bold-txt">Email: </span>{user.email}</p>
        <p className="text-sm text-gray-600"><span className="bold-txt">Company: </span>{user.company}</p>
      </div>
      <div className="space-x-2">
        <Link to={`/user/${user._id}`} className="view-btn text-blue-500">View</Link>
        <Link to={`/edit/${user._id}`} className="edit-btn text-green-500">Edit</Link>
        <button onClick={handleDelete} type="button" className="delete-btn text-red-500">Delete</button>
      </div>
    </div>
  );
}

export default UserCard;
