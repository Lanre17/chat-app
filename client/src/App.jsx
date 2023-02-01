import { Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import "bootstrap/dist/css/bootstrap.min.css";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <ChatContextProvider user={user}>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />}/>

        <Route path="/login" element={user ? <Chat /> : <Login />}/>
        <Route path="/register" element={user ? <Chat /> : <Register />}/>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </ChatContextProvider>
  );
}

export default App;
