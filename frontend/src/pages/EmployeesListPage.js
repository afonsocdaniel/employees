import React, { useEffect, useState } from 'react';

import { Layout, Card, Col, Row, Pagination, Space, theme } from 'antd';

const { Header, Footer, Content } = Layout;
const { Meta } = Card;

const EmployeesListPage = () => {
  const { token: { colorBgContainer }, } = theme.useToken();
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
      <Header style={{ background: colorBgContainer }} />

      <Content>
        <Row gutter={[16, 16]}>
          {employees.map((employee) => (
            <Col span={6} key={employee.id}>
              <Card
                onClick={() => { console.log(employee.id) }}
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

        <Footer>
          <Space align='center' direction='vertical' style={{ width: '100%' }}>
            <Pagination
              onChange={(pageNumber) => setCurrentPage(pageNumber)}
              defaultCurrent={currentPage}
              pageSize={employeePerPage}
              total={totalEmployees}
              showTotal={(total) => `Total ${totalEmployees} employees`}
            />
          </Space>
        </Footer>
      </Content>
    </Layout>
  );
};

export default EmployeesListPage;