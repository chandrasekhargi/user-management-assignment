import mongoose from "mongoose";

const geoSchema = new mongoose.Schema({
  lat: { type: String, required: true },
  lng: { type: String, required: true },
});

const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  zipcode: { type: String, required: true },
  geo: geoSchema,
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
  phone: String,
  company: String,
  address: addressSchema,
});

const User = mongoose.model("User", userSchema);
export default User;
