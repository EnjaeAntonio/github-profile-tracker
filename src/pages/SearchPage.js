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
    <div className="search-form container h-screen w-screen grid justify-center items-center">
        <form onSubmit={handleSubmit} className="grid"
        autoComplete="off"
        >
        <h1 className="text-6xl text-center">GitHub</h1>
        <div className="flex gap-4 mb-5 mt-3 justify-center items-center">
          <input 
          type="search"
          placeholder="Search for user"
          name="user"
          onChange={handleChange}
          value={userName}
          />
        </div>
      </form>
    </div>
  )
}

export default SearchPage;