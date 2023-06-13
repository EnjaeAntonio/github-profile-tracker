import './style/style.css';
import { Routes, Route } from "react-router-dom";
import UserAccount from "./pages/UserAccount";
import SearchPage from "./pages/SearchPage";
function App() {
  return (
    <div className="shadow">
    <div className="container">
      <Routes>
        <Route exact path="/github-profile-tracker" element={<SearchPage/>} index/>
        <Route exact path="user/:username" element={<UserAccount/>}/>
      </Routes>
    </div>
    </div>

  );
}

export default App;
