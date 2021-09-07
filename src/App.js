import React, { useState } from 'react';
import './App.less';
import { Layout, Button } from 'antd';
import TaskPage from './TaskPage';
import InboxPage from './InboxPage'
import Shape from './Shape.svg'
import { ChromeReaderModeOutlined, QuestionAnswerOutlined } from '@material-ui/icons';

const { Header, Sider, Content } = Layout;

function App() {

  const [openPanel, setOpenPanel] = useState(false)
  const [openedPage, setOpenedPage] = useState(null)
  const [buttonState, setButtonState] = useState(false)
  const [reverse, setReverse] = useState(null)

  const openPage = (page) => {
    openPanelState(page)
    if (page === "task") {
      setReverse({ display: "flex", flexDirection: "row-reverse" })
    } else {
      setReverse(null)
    }
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

  const openButton = () => {
    setButtonState(!buttonState)
    if (buttonState === false) {
      setOpenPanel(false)
      setOpenedPage(null)
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
              <div
                style={{ float: "left" }}
                className={buttonState === true ? "pop-up-button-active" : "pop-up-button-inactive"}>
                <div style={reverse}>
                  <div style={{ textAlign: "center", float: "left" }}>
                    <small>Task</small><br />
                    <Button
                      type="button"
                      shape="circle"
                      size="large"
                      icon={<ChromeReaderModeOutlined style={{ marginTop: 5 }} />}
                      autoFocus={false}
                      style={{ margin: "0px 5px" }}
                      onClick={() => openPage("task")}
                      className={openedPage === "task" ? "button task task-active" : "button task"}
                    />
                  </div>
                  <div style={{ textAlign: "center", float: "left" }}>
                    <small>Inbox</small><br />
                    <Button
                      type="default"
                      htmlType="button"
                      shape="circle"
                      size="large"
                      style={{ margin: "0px 5px" }}
                      icon={<QuestionAnswerOutlined style={{ marginTop: 5 }} />}
                      onClick={() => openPage("inbox")}
                      className={openedPage === "inbox" ? "button inbox inbox-active" : "button inbox"}
                    />
                  </div>
                </div>
              </div>

              <div style={{ float: "right", paddingLeft: 10, paddingTo: 50 }}>
                <div>
                  <br />
                  <Button
                    shape="circle"
                    type="primary"
                    size="large"
                    onClick={openButton}
                  ><img src={Shape} width="auto" height={20} style={{ marginTop: -5 }} /></Button>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </Layout>
    </>
  );
}

export default App;
