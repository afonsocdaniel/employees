import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import { Layout, Card, Col, Row, Pagination, Space, Divider } from 'antd';
import Header from '../components/Header';

const { Content } = Layout;
const { Meta } = Card;

const EmployeesListPage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [employeePerPage, setEmployeePerPage] = useState(0);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const loadEmployees = async () => {
      const res = await fetch(`http://localhost:5001/api/employees.json?page=${currentPage}&per_page=8`);
      const json = await res.json();

      setTotalEmployees(json.pagination.total);
      setEmployeePerPage(json.pagination.per_page);
      setEmployees(json.employees);
    };

    loadEmployees();
  }, [currentPage]);

  return (
    <Layout>
      <Header />

      <Content>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Space align='center' direction='vertical' style={{ width: '100%' }}>
              <Pagination
                onChange={(pageNumber) => setCurrentPage(pageNumber)}
                defaultCurrent={currentPage}
                pageSize={employeePerPage}
                total={totalEmployees}
                showTotal={(total) => `Total ${totalEmployees} employees`}
              />
            </Space>
          </Col>
        </Row>

        <Divider />

        <Row gutter={[16, 16]}>
          {employees.map((employee) => (
            <Col span={6} key={employee.id}>
              <Card
                onClick={() => navigate(`/employees/${employee.id}`)}
                hoverable
                cover={<img alt={employee.first_name} src={employee.avatar} />}
              >
                <Meta
                  title={`${employee.first_name} ${employee.last_name}`}
                  description={employee.email}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </Content>
    </Layout>
  );
};

export default EmployeesListPage;