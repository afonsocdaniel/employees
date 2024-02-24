import { useQuery } from '@tanstack/react-query';
import { message } from 'antd';

const BASE_URL = 'http://localhost:5001/api/employees';

export const useEmployeeList = ({ currentPage }) => useQuery({
  queryKey: ['employees', currentPage],
  queryFn: () =>
    fetch(`${BASE_URL}.json?page=${currentPage}&per_page=8`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        throw new Error('Error fetching employees list');
      }),
  onError: () => message.error("Something went wrong"),
});

export const useEmployeeDetails = ({ employeeID }) => useQuery({
  queryKey: ['employee', employeeID],
  queryFn: () =>
    fetch(`${BASE_URL}/${employeeID}.json`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      throw new Error('Error fetching employee details.');
    }),
  onError: () => message.error("Something went wrong"),
});
