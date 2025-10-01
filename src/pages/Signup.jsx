import { useState } from "react";
import AuthLayout from "../layouts/AuthLayout";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      await register(name, email, password);
      // Redirect to home or login page after successful registration
      setIsLoading(false);
      navigate("/home");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <AuthLayout>
      {isLoading && <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
      </div>}
      <h2 className="w-fit font-semibold text-2xl mx-auto">Sign Up</h2>
      <input value={name} onChange={(e) => {
        setName(e.target.value);
      }} className=" mt-6 bg-transparent w-full rounded-2xl border-b-1 border-gray-400 p-2 px-3" placeholder="Name"/>
      <input value={email} onChange={(e) => {
        setEmail(e.target.value);
      }} className=" mt-4 bg-transparent w-full rounded-2xl border-b  order-gray-400 p-2 px-3" placeholder="Email"/>
      <input value={password} onChange={(e) => {
        setPassword(e.target.value);
      }} className=" mt-4 bg-transparent w-full rounded-2xl border-b  order-gray-400 p-2 px-3" placeholder="Password"/>
      <input value={confirmPassword} onChange={(e) => {
        setConfirmPassword(e.target.value);
      }} className=" mt-4 bg-transparent w-full rounded-2xl border-b  order-gray-400 p-2 px-3" placeholder="Confirm Password"/>
      <button className="bg-green-600 text-white w-full h-10 rounded-2xl p mt-6 hover:bg-green-700 transition" onClick={handleSubmit}>Sign Up</button>
      {/*navigate to login using router dom*/}
      <p className="text-sm text-gray-600 mt-4 text-center">Already have an account? <a href="/login" className="text-green-600">Login</a></p>
    </AuthLayout>
  );
}