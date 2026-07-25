import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/header.jsx";
import Home from "./pages/home.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/login.jsx";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="signup" element={<Signup/>}></Route>
                <Route path="login" element={<Login/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;