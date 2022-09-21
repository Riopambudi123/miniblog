import { Route, Routes } from "react-router-dom";
import ArticleCreate from "./pages/ArticleCreate";
import Articles from "./pages/Articles";
import ArticleShow from "./pages/ArticleShow";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Welcome from "./pages/Welcome";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        {/* Articles */}
        <Route path="/articles" element={<Articles />} />
        <Route path="/article/:articleId" element={<ArticleShow />} />
        <Route path="/article-create" element={<ArticleCreate />} />
      </Routes>
    </div>
  );
}

export default App;
