import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmployeesListPage from "./pages/EmployeesListPage";
import EmployeeDetailspage from "./pages/EmployeeDetailspage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmployeesListPage />} />
        <Route path="employees/:id" element={<EmployeeDetailspage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;