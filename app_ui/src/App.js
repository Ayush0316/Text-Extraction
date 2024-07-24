import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/Landing/LangingPage";
import DashBoard from './pages/Dashboard/Dashboard';
import Editor from "./pages/Editor/Editor";

function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashBoard></DashBoard>}></Route>
      <Route path="/editor" element={<Editor />} />
      <Route path="/*" element={<LandingPage/>}></Route>
    </Routes>
  );
}

export default App;
