import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Layout, Breadcrumb, Avatar, Col, Row, Divider, Descriptions, Result, Button } from 'antd';
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
  const [employeeInfo, setEmployeeInfo] = useState({});

  useEffect(() => {
    const loadEmployeeData = async () => {
      const res = await fetch(`http://localhost:5001/api/employees/${params.id}.json`);

      if (res.status !== 200) { return setEmployeeInfo(null); };

      const json = await res.json();
      setEmployeeInfo(json.employee);
    };

    loadEmployeeData();
  }, [params.id]);

  if (!employeeInfo) { return <EmployeeNotFound />; }

  return (
    <Layout>
      <Header />

      <Content>
        <Breadcrumb
          separator=">"
          items={[ { title: 'Employees', href: '/', onClick: () => navigate('/') }, { title: employeeInfo.first_name }]}
        />

        <Divider />

        <Row gutter={[16, 16]}>
          <Col span={16}>
            <Descriptions title="Employee Info" bordered size={'small'}>
              <Descriptions.Item label="Profile Picture"><Avatar size={64} src={employeeInfo.avatar}/></Descriptions.Item>
              <Descriptions.Item label="First Name">{employeeInfo.first_name}</Descriptions.Item>
              <Descriptions.Item label="Last Name">{employeeInfo.last_name}</Descriptions.Item>
              <Descriptions.Item label="Email">{employeeInfo.email}</Descriptions.Item>
              <Descriptions.Item label="ID">#{employeeInfo.id}</Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default EmployeeDetailspage;