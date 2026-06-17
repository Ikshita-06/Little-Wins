import "./App.css";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="app">
      <Sidebar />

      <div className="main-content">
        <div className="page-container">
          <Topbar />
          <Dashboard />
        </div>
      </div>
    </div>
  );
}

export default App;