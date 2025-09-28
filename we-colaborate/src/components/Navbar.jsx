import { useNavigate } from "react-router-dom"

function Navbar({navbarOptions, activeNav, setActiveNav}) {
  const navigate = useNavigate();
  return (
    <>
    <div className="h-[100vh] w-[5%] shadow-2xl px-2 shadow-gray-300">
      <div className="flex flex-col items-center py-6 space-y-6">
        <a href="/"><img src="/logo.png" alt="Logo" className="w-10 h-10"/></a>
      </div>
      <div className="flex flex-col items-center space-y-6">
        {navbarOptions && navbarOptions.map((option) => (
          <button key={option.name} className={("text-gray-600 hover:text-blue-600 transition ") + (option.name === activeNav? ("text-blue-600 ") : "")  } onClick={() => {
            setActiveNav(option.name);}}>
            {option.name.charAt(0).toUpperCase() + option.name.slice(1)}
          </button>
        ))}
      </div>
      <div className="absolute bottom-0  flex flex-col items-center mb-6 space-y-4">
        <button className="text-gray-600 hover:text-red-600 transition" onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}>Logout</button>
      </div>
    </div>
    </>
  );
}

export default Navbar;