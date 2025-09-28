import {  useState } from "react";
import AuthLayout from "../layouts/AuthLayout";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault(); 
    try {
      await login(email, password);
      // Redirect to home page after successful login
      setIsLoading(false);

      navigate("/home");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <AuthLayout>
      {isLoading && <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
      </div>}
      <h2 className="w-fit font-semibold text-2xl mx-auto">Login</h2>
      <input value={email} onChange={(e) => {
        setEmail(e.target.value);
      }} className=" mt-10 bg-transparent w-full rounded-2xl border-b-1 border-gray-400 p-2 px-3" placeholder="Email"/>
      <input value={password} onChange={(e) => {
        setPassword(e.target.value);
      }} className=" mt-4 bg-transparent w-full rounded-2xl border-b-1 border-gray-400 p-2 px-3" placeholder="Password"/>
      <div className="flex justify-between">
        <div className="flex items-center mt-4">
          <input type="checkbox" id="remember" className="mr-2"/>
          <label htmlFor="remember" className="text-sm text-gray-600">Remember me</label>
        </div>
        <a href="#" className="text-sm text-green-600 mt-4">Forgot Password?</a>
      </div>
      <button onClick={handleSubmit} className="bg-green-600 text-white w-full rounded-2xl p-2 mt-6 hover:bg-green-700 transition">Login</button>
      <p className="text-sm text-gray-600 mt-4 text-center">Don't have an account? <a href="/signup" className="text-green-600">Sign Up</a></p>
 
    </AuthLayout>
  );
}