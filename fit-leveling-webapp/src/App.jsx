import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<h1 style={{ color: "#fff", textAlign: "center" }}>404 Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
