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
    <div className="container">
        <form onSubmit={handleSubmit}>
        <input 
        type="search"
        placeholder="Search..."
        name="user"
        onChange={handleChange}
        value={userName}
        />
        <input 
        type="submit"
        />
      </form>
    </div>
  )
}

export default SearchPage