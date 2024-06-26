import { Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import CreatePlan from "./screens/CreatePlan";
import Plan from "./screens/Plan";
import Test from "./screens/Test";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<CreatePlan />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/plan/:id" element={<Plan />} />
      <Route path="/test" element={<Test />} />
    </Routes>
  );
}

export default App;
