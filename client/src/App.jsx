import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {

  return (
   
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={ <Home />} />

          <Route path="/login" element={ <Login />} />
          <Route path="/register" element={ <Register /> } />

          <Route path="/chat" element={ <Chat /> } />
        </Routes>
      </BrowserRouter>
   
  );
}

export default App;
