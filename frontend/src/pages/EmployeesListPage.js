import React from 'react';
import { Layout, theme } from 'antd';

const { Header, Content } = Layout;

const EmployeesListPage = () => {
  const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();

  return (
    <Layout>
      <Header style={{ padding: 0, background: colorBgContainer }} />

      <Content style={{ margin: '24px 16px 0' }} >
        <div
          style={{
            padding: 24,
            minHeight: 360,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          content
        </div>
      </Content>
    </Layout>
  );
};

export default EmployeesListPage;