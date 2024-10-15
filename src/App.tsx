import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreatePlan from "./pages/CreatePlan";
import Plan from "./pages/Plan";
import Auth from "./services/Auth";
import Profile from "./pages/Profile";
import SearchUser from "./pages/SearchUser";
import Header from "./components/header/Header";

function App() {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreatePlan />} />
        <Route path="/plan/:id" element={<Plan />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/search/user" element={<SearchUser />} />
      </Routes>
    </>
  );
}

export default App;
