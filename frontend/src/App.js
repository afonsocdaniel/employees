import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider } from '@tanstack/react-query';
import { QueryClient } from '@tanstack/react-query';

import EmployeesListPage from "./pages/EmployeesListPage";
import EmployeeDetailspage from "./pages/EmployeeDetailspage";

const queryClient = new QueryClient({});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EmployeesListPage />} />
          <Route path="employees/:id" element={<EmployeeDetailspage />} />
        </Routes>
      </BrowserRouter>

    </QueryClientProvider>
  );
};

export default App;