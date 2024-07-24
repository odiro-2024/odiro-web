import { Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import CreatePlan from "./screens/CreatePlan";
import Plan from "./screens/Plan";
import Auth from "./screens/Auth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<CreatePlan />} />
      <Route path="/plan/:id" element={<Plan />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
}

export default App;
