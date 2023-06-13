import './style/style.css';
import { BrowserRouter as Route, useParams } from "react-router-dom";
import UserAccount from "./pages/UserAccount";
function App() {
  const { user } = useParams();
  const handleSubmit = (event) => {
    event.preventDefault();
    const user = event.target.user.value.trim();
    setUser(user);
  }
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input 
        type="search"
        placeholder="Search..."
        name="user"
        />
        <input 
        type="submit"
        />
      </form>
      <Route exact path="user/:username" component={UserAccount}/>
    </div>
  );
}

export default App;
