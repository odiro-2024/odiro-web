import { Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import CreatePlan from "./screens/CreatePlan";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<CreatePlan />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
