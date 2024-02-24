import React, { useEffect, useState } from 'react';
import { Layout, Card, Col, Row, theme } from 'antd';

const { Header, Content } = Layout;
const { Meta } = Card;

const EmployeesListPage = () => {
  const { token: { colorBgContainer }, } = theme.useToken();
  const [employees, setEmployees] = useState([]);
  const loadEmployees = async () => {
    const res = await fetch("http://localhost:5001/api/employees.json?page=1&per_page=8");
    const json = await res.json();
    setEmployees(json.employees);
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  return (
    <Layout>
      <Header style={{ background: colorBgContainer }} />

      <Content style={{ margin: '24px 16px 0' }} >
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

      </Content>
    </Layout>
  );
};

export default EmployeesListPage;