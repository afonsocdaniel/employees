import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmployeesListPage from "./pages/EmployeesListPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmployeesListPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;