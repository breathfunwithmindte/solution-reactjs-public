import { Routes, Route } from "react-router-dom";
import './styles/app.css';
import './styles/index.css';
import './styles/lib.css';
import AdminRoute from "./applications/admin/AdminRoute";
import MessageRoute from "./applications/messages/MessageRoute";
import Dashboard from "./applications/dashboard/Dashboard";
import Homepage from "./applications/Homepage";


function App() {

  return (
    <div className="App bg1">
      <Routes>
        <Route path={"/admin/sector/*"} element={<AdminRoute />} />
        <Route path={"/admin/messages/*"} element={<MessageRoute />} />
        <Route path={"/admin/dashboard/*"} element={<Dashboard />} />
        <Route path={"/*"} element={<Homepage />} /> 
      </Routes>
    </div>
  );
}

export default App;