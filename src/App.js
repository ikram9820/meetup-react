import { Routes, Route } from "react-router-dom";
import AddMeetup from "./pages/AddMeetup";
import AllMeetups from "./pages/AllMeetups";
import Favorite from "./pages/Favorites";
import Navigation from "./components/Navigation";

function App() {
  return (
    <Navigation>
      <div className="container">
        <div className="row justify-content-center ">
          <Routes>
            <Route path="/" exact element={<AllMeetups />} />
            <Route path="/add-meetup" element={<AddMeetup />} />
            <Route path="/favorites" element={<Favorite />} />
          </Routes>
        </div>
      </div>
    </Navigation>
  );
}

export default App;
