import { Input, Spin, List, Card, Row, Col, Avatar, PageHeader } from 'antd'
import React, { useState } from 'react'
import {
  CloseOutlined
} from '@ant-design/icons';
import { data_inbox } from './data';
import { Button } from 'antd/lib/radio';

export default function InboxPage() {

  const [loading] = useState(false)
  const [displayComment, setDisplayComment] = useState(false)
  const [comments, setComment] = useState([])

  const showComment = (index) => {
    console.log(index)
    setDisplayComment(true)
    setComment(data_inbox[index])
  }

  const closeComment = () => {
    setDisplayComment(false)
  }

  return (
    <>
      <Card className="panel" size="small">
        {displayComment === false ?
          <>
            <div>
              <Input.Search placeholder="Search Something" />
            </div><br />
            <Spin spinning={loading}>
              <List
                dataSource={data_inbox}
                renderItem={(list, i) => (
                  <div className="list" onClick={() => showComment(i)} style={{ cursor: "pointer" }}>
                    <Row gutter={16}>
                      <Col span={2}>
                        <Avatar>U</Avatar>
                      </Col>
                      <Col span={16}>
                        <span className="link">
                          {list.message}
                        </span>
                      </Col>
                      <Col span={6} style={{ textAlign: "right" }}>
                        <small>{list.date}</small>
                      </Col>
                    </Row>
                  </div>
                )}
              />
            </Spin>
          </>
          : <>
            <PageHeader
              onBack={closeComment}
              extra={<CloseOutlined />}
              subTitle={<><span className="link">{comments.message}</span></>} style={{ padding: 0 }} className="border-bottom" />
            <List
              dataSource={comments.comments}
              renderItem={date => (
                <>
                  <div>{date.date}</div>
                  <List
                    dataSource={date.comments}
                    renderItem={list => (
                      <>
                        {list.sender !== "Irfan" ?
                          <>
                            <div><small>{list.sender}</small></div>
                            <div className="chat">
                              {list.message}<br />
                              <small>{list.time}</small>
                            </div><br clear="all" />
                          </> :
                          <>
                            <div style={{ textAlign: "right" }}><small>{list.sender}</small></div>
                            <div className="chat-me">
                              {list.message}<br />
                              <small>{list.time}</small>
                            </div><br clear="all" />
                          </>
                        }
                      </>
                    )}
                  />
                </>
              )}
            /><br /><br />
            <div className="message-input">
              <Row>
                <Col span={24}>
                  <Input.Group compact>
                    <Input placeholder="Write Message" style={{ width: "84%" }} />
                    <Button type="primary" style={{ width: "16%" }}>Send</Button>
                  </Input.Group>
                </Col>
              </Row>

            </div>
          </>}

      </Card>

    </>
  )
}