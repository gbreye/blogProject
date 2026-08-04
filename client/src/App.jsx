import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/header.jsx";
import Home from "./pages/home.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/login.jsx";
import Dashboard from "./pages/dashboard.jsx";
import Post from "./pages/addpage.jsx";
import AddedPost from "./pages/page.jsx";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="signup" element={<Signup/>}></Route>
                <Route path="login" element={<Login/>}></Route>
                <Route path="dashboard" element={<Dashboard/>}></Route>
                <Route path="addpage" element={<Post/>}></Route>
                <Route path="post/:id" element={<AddedPost/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;