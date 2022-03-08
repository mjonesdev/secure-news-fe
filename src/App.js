import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Articles from "./pages/Articles";
import SingleArticle from "./pages/SingleArticle";
import Navigation from "./components/Navigation";
import Account from "./pages/Account";
import Error from "./pages/Error";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Articles />}>
          <Route path=":topic" element={<Articles />} />
        </Route>
        <Route path="article/:article_id" element={<SingleArticle />} />
        <Route path="/user" element={<Account />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
