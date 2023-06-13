import './style/style.css';
import { Routes, Route } from "react-router-dom";
import UserAccount from "./pages/UserAccount";
import SearchPage from "./pages/SearchPage";
function App() {
  return (
    <div className="container">
      <Routes>
        <Route exact path="/" element={<SearchPage/>}/>
        <Route exact path="user/:username" element={<UserAccount/>}/>
      </Routes>
    </div>
  );
}

export default App;
