import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Home from "./pages/Home.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AddPage from "./pages/AddPage.jsx";
import PostPage from "./pages/PostPage.jsx";
import AllPosts from "./pages/AllPosts.jsx";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addpage" element={<AddPage />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/allposts" element={<AllPosts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
