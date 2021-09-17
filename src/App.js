import AddPage from "./AddPage";
import "./App.css"
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';

const App = () =>{
  const { Header, Sider, Content } = Layout;
    return (
      <Layout>
        <Sider >
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            {/* <Menu.Item key="1" icon={<UserOutlined />}>
              Profile
            </Menu.Item> */}
            <Menu.Item key="2" icon={<UploadOutlined  />}>
              Add
            </Menu.Item>
            <Menu.Item key="3" icon={<VideoCameraOutlined/>}>
              View
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <Header />
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 800,
            }}
          >
             <AddPage />
          </Content>
        </Layout>
      </Layout>
    );
}

export default App;
