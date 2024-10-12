import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import SearchPage from "./pages/SearchPage";
import HomePage from "./pages/HomePage";
const App = () => {
    return (
    <div
      style={{
        backgroundColor: "#00B4DB", // Fallback for old browsers
        backgroundImage: "linear-gradient(to left, #0083B0, #00B4DB)", // Standard CSS
        background: "-webkit-linear-gradient(to left, #0083B0, #00B4DB)", // Fallback for older browsers like Chrome 10-25, Safari 5.1-6
      }}
      className="min-h-screen flex flex-col justify-center items-center"
      >
        <Router>
          <Routes>
            <Route path="/home" exact element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            {/* Default route */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Router>
    </div>
  );
};

export default App;
