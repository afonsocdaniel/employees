import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useEmployeeDetails } from '../actions/useEmployee';
import { Layout, Breadcrumb, Avatar, Col, Row, Divider, Descriptions, Result, Button, Spin } from 'antd';
import Header from '../components/Header';

const { Content } = Layout;

const EmployeeNotFound = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="Employee found"
      subTitle="Sorry, we couldn't find the employee you were looking for."
      extra={<Button type="primary" onClick={() => navigate('/')}>Back Home</Button>}
    />
  );
}

const EmployeeDetailspage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const {
    data = { employee: {} },
    isLoading,
    error
  } = useEmployeeDetails({ employeeID: params.id });

  if (isLoading) { return <Spin />; }
  if (error) { return <EmployeeNotFound />; }

  return (
    <Layout>
      <Header />

      <Content>
        <Breadcrumb
          separator=">"
          items={[ { title: 'Employees', href: '/', onClick: () => navigate('/') }, { title: data.employee.first_name }]}
        />

        <Divider />

        <Row gutter={[16, 16]}>
          <Col span={16}>
            <Descriptions title="Employee Info" bordered size={'small'}>
              <Descriptions.Item label="Profile Picture"><Avatar size={64} src={data.employee.avatar}/></Descriptions.Item>
              <Descriptions.Item label="First Name">{data.employee.first_name}</Descriptions.Item>
              <Descriptions.Item label="Last Name">{data.employee.last_name}</Descriptions.Item>
              <Descriptions.Item label="Email">{data.employee.email}</Descriptions.Item>
              <Descriptions.Item label="ID">#{data.employee.id}</Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default EmployeeDetailspage;