import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import InputField from "../components/InputField";
import './pages.css'

function EditUser() {
  const { id } = useParams();
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", street: "", city: "", zipcode: "", lat: "", lng: "" });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://user-management-assignment-6.onrender.com/api/users/${id}`).then((res) => {
      const u = res.data;
      setForm({
        name: u.name,
        email: u.email,
        phone: u.phone,
        company: u.company,
        street: u.address?.street || "",
        city: u.address?.city || "",
        zipcode: u.address?.zipcode || "",
        lat: u.address?.geo?.lat || "",
        lng: u.address?.geo?.lng || "",
      });
    });
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      company: form.company,
      address: {
        street: form.street,
        city: form.city,
        zipcode: form.zipcode,
        geo: { lat: form.lat, lng: form.lng }
      }
    };
    axios.put(`https://user-management-assignment-6.onrender.com/api/users/${id}`, payload).then(() => navigate("/"));
  };

  return (
    <div className="user-details p-6 max-w-lg mx-auto bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Edit User</h2>
      <form onSubmit={handleSubmit}>
        <InputField className="input-field-space" label="Name" name="name" value={form.name} onChange={handleChange} required />
        <InputField className="input-field-space" label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
        <InputField label="Phone" name="phone" value={form.phone} onChange={handleChange} />
        <InputField label="Company" name="company" value={form.company} onChange={handleChange} />
        <InputField label="Street" name="street" value={form.street} onChange={handleChange} required />
        <InputField label="City" name="city" value={form.city} onChange={handleChange} required />
        <InputField label="Zipcode" name="zipcode" value={form.zipcode} onChange={handleChange} required />
        <InputField label="Latitude" name="lat" value={form.lat} onChange={handleChange} required />
        <InputField label="Longitude" name="lng" value={form.lng} onChange={handleChange} required />
        <button type="submit" className="update-btn w-full bg-green-500 text-white px-4 py-2 rounded">Update</button>
      </form>
    </div>
  );
}

export default EditUser;
