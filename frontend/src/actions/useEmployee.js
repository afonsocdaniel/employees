import { useQuery } from '@tanstack/react-query';

const BASE_URL = 'http://localhost:5001/api/employees';

export const useEmployeeList = ({ currentPage, ...props }) => useQuery({
  queryKey: ['employees', currentPage],
  queryFn: () =>
    fetch(`${BASE_URL}.json?page=${currentPage}&per_page=8`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        throw new Error('Error fetching employees list');
      }),
  ...props,
});

export const useEmployeeDetails = ({ employeeID, ...props }) => useQuery({
  queryKey: ['employee', employeeID],
  queryFn: () =>
    fetch(`${BASE_URL}/${employeeID}.json`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      throw new Error('Error fetching employee details.');
    }),
  ...props,
});
