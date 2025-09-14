import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/users/${id}`).then((res) => setUser(res.data));
  }, [id]);

  if (!user) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 user-details max-w-lg mx-auto bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">{user.name}</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Company:</strong> {user.company}</p>
      <p><strong>Street:</strong> {user.address?.street}</p>
      <p><strong>City:</strong> {user.address?.city}</p>
      <p><strong>Zipcode:</strong> {user.address?.zipcode}</p>
      <p><strong>Geo:</strong> {user.address?.geo?.lat}, {user.address?.geo?.lng}</p>
    </div>
  );
}

export default UserDetails;
