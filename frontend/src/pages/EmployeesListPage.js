import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import { useEmployeeList } from '../actions/useEmployee';
import { Layout, Card, Col, Row, Pagination, Space, Divider, Spin, message } from 'antd';
import Header from '../components/Header';

const { Content } = Layout;
const { Meta } = Card;

const EmployeesListPage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data = { employees: [] , pagination: { } },
    isLoading
  } = useEmployeeList({
    currentPage: currentPage,
    onSuccess: (_) => message.error("Success loading employees list"),
    onError: () => message.error("Something went wrong"),
  });

  if (isLoading) { return <Spin />; }

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
                pageSize={data.pagination.per_page}
                total={data.pagination.total}
                showTotal={(total) => `Total ${data.pagination.total} employees`}
              />
            </Space>
          </Col>
        </Row>

        <Divider />

        <Row gutter={[16, 16]}>
          {data.employees.map((employee) => (
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