function AuthLayout({ children }) {
  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen ">
      <div className="border-r-2 border-gray-200 p-4">
        <h1 className="text-4xl font-semibold text-green-600 mt-2">We Collaborate.</h1>
        <h2 className="text-lg text-gray-500">Your platform for seamless colaboration</h2>
        <div className="mt-10 min-h-[400px] w-[60%] mx-auto border-1 border-green-200 rounded-2xl shadow-gray-300 shadow-lg p-8">
          {children}
        </div>
      </div>
      <div className="bg-green-600 h-full">
        <img
          src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
          alt="Collaboration"
          className="w-full h-full object-cover opacity-90"
        />
      </div>
    </div>
    </>
  );
}

export default AuthLayout;