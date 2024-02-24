import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Layout, Breadcrumb, Avatar, Col, Row, Divider, Descriptions, theme } from 'antd';

const { Header, Content } = Layout;

const EmployeeDetailspage = () => {
  const { token: { colorBgContainer }, } = theme.useToken();
  const params = useParams();
  const [employeeInfo, setEmployeeInfo] = useState([]);

  useEffect(() => {
    const loadEmployeeData = async () => {
      const res = await fetch(`http://localhost:5001/api/employees/${params.id}.json`);
      const json = await res.json();
      setEmployeeInfo(json.employee);
    };

    loadEmployeeData();
  }, [params.id]);

  return (
    <Layout>
      <Header style={{ background: colorBgContainer }} />

      <Content>
        <Breadcrumb
          separator=">"
          items={[ { title: 'Employees', href: '/', }, { title: employeeInfo.first_name }]}
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