import { Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import CreatePlan from "./screens/CreatePlan";
import Plan from "./screens/Plan";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<CreatePlan />} />
      <Route path="/plan/:id" element={<Plan />} />
    </Routes>
  );
}

export default App;
