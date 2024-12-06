import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import Profile from "./pages/my_profile/index";
import Happy from "./pages/home/happy";
import ResultHappy from "./pages/home/result_happy";
import useAuth from "./pages/home/useAuth";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        {/* If useAuth is a hook, it should be used inside a component, not as a route */}
        <Route path="/useAuth" element={<useAuth />} /> {/* Only if useAuth is a component */}
        
        {/* Happy route should accept a dynamic parameter (score) */}
        <Route path="/happy/:score" element={<Happy />} />

        {/* ResultHappy should accept dynamic parameters for final score and risk level */}
        <Route path="/result_happy/:calculatedSum/:emo" element={<ResultHappy />} />
        
        {/* Catch-all route for 404 */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
