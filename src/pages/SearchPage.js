import { useState } from "react";
import { useNavigate } from 'react-router-dom';
function SearchPage() {
const [userName, setUserName] = useState('');
const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        if(userName !== ''){
          navigate(`/user/${userName}`)
        }
    }

    const handleChange = (event) => {
        setUserName(event.target.value.trim());
    };    

  return (
    <div className="container h-screen w-screen grid justify-center items-center">
        <form onSubmit={handleSubmit} className="grid">
        <h1 className="text-6xl">GitHub Profile Finder!</h1>
        <p className="text-xs mt-5"><span>Search for a user</span></p>
        <div className="flex gap-4 mb-5">
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
        </div>

      </form>
    </div>
  )
}

export default SearchPage;