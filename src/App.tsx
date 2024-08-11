import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreatePlan from "./pages/CreatePlan";
import Plan from "./pages/Plan";
import Auth from "./services/Auth";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<CreatePlan />} />
      <Route path="/plan/:id" element={<Plan />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
}

export default App;
