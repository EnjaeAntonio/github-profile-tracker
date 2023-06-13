import { useState } from "react";
import { useNavigate } from 'react-router-dom';
function SearchPage() {
const [userName, setUserName] = useState('');
const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate(`/user/${userName}`)
    }

    const handleChange = (event) => {
        setUserName(event.target.value.trim());
    };    

  return (
    <div className="container h-screen w-screen flex justify-center items-center">
        <form onSubmit={handleSubmit} className="flex gap-2">
        <input 
        type="search"
        placeholder="Search..."
        name="user"
        onChange={handleChange}
        value={userName}
        />
        <input 
        type="submit"
        className=""
        />
      </form>
    </div>
  )
}

export default SearchPage