import React, { useState } from 'react';
import './App.less';
import { Layout, Button } from 'antd';
import {
  OrderedListOutlined,
  CommentOutlined
} from '@ant-design/icons';
import TaskPage from './TaskPage';
import InboxPage from './InboxPage'

const { Header, Sider, Content } = Layout;

function App() {

  const [openPanel, setOpenPanel] = useState(false)
  const [openedPage, setOpenedPage] = useState(null)

  const openPage = (page) => {
    openPanelState(page)

  }

  const openPanelState = (page) => {
    if (openedPage === page) {
      setOpenPanel(false)
      setOpenedPage(null)
    } else {
      setOpenPanel(true)
      setOpenedPage(page)
    }
  }

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider>

        </Sider>
        <Layout className="site-layout-background">
          <Header className="header-background" style={{ padding: 0 }}>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
            }}
          >

          </Content>
          <div className="button-bottom">
            {openPanel === true ?
              <div style={{ marginBottom: 20 }}>
                {openedPage !== null ? (openedPage === "task" ? <TaskPage /> : <InboxPage />) : ""}
              </div>
              : ""
            }
            <div style={{ float: "right" }}>
              <Button
                type="default"
                shape="circle"
                size="large"
                icon={<OrderedListOutlined />}
                style={{ marginRight: 10 }}
                onClick={() => openPage("task")}
              />
              <Button
                type="default"
                shape="circle"
                size="large"
                icon={<CommentOutlined />}
                onClick={() => openPage("inbox")}
              />
            </div>

          </div>
        </Layout>
      </Layout>
    </>
  );
}

export default App;
