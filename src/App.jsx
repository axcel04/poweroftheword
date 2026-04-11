import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Header from "./components/Header";
import Home from "./pages/Home";
import Programme from "./pages/Programme";
import Events from "./pages/Events";
import About from "./pages/About";
import Audios from "./pages/Audio";
import Donate from "./pages/Donate";
// import Footer from "./components/Footer";
import AdminLogin from "./pages/Login";
import DashboardAdmin from "./pages/Dashboard";

function App() {
  return (
      <>
      <Router>
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/programme" element={<Programme />} />
          <Route path="/events" element={<Events />} />
          <Route path="/audio" element={<Audios />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/adminLogin" element ={<AdminLogin />} />
          <Route path="/dashboardAdmin" element={<DashboardAdmin />} />
        </Routes>
        {/* <Footer /> */}
        {/* <Location /> */}
      </Router>
      </>
  );
}

export default App;