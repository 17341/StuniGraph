import "./App.css"
import { useState } from "react";
import AddPage from "./components/Pages/AddPage";
import ViewPage from "./components/Pages/ViewPage";
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { Neo4jProvider, createDriver } from "use-neo4j"

const App = () =>{
  
  const { Header, Sider, Content } = Layout;
  const [add, setAdd] = useState(false)
  const onSelect = (e) =>{
    e.key === "add" ? setAdd(true) : setAdd(false)
  }
  return (
    <Layout>
      <Sider >
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['view']} onSelect = {onSelect}>
          {/* <Menu.Item key="profile" icon={<UserOutlined />}>
            Profile
          </Menu.Item> */}
          <Menu.Item key="add" icon={<UploadOutlined  />}>
            Add
          </Menu.Item>
          <Menu.Item key="view" icon={<VideoCameraOutlined/>}>
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
          {add ? <AddPage /> : <ViewPage />}
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
