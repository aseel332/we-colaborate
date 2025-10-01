export default function ProfileCircle({user, type }) {
  const img = user.img || "/user.png";
  return (
    <div className="flex flex-col items-center w-fit">
      <div className="w-15 h-15 rounded-full overflow-hidden ">
        <img src={img} alt={user.name} className="w-full h-full object-cover"/>
      </div>
      <h3 className="mt-1 text-md font-semibold">{user.name}</h3>
      <p className="text-xs text-gray-600">{type}</p>
    </div>
  )
}