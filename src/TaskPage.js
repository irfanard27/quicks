import { Input, Spin, Row, Col, Select, Card, Checkbox, Button, Collapse, DatePicker } from 'antd'
import React, { useEffect, useState } from 'react'
import {
  ClockCircleOutlined,
  EditOutlined,
  EllipsisOutlined
} from '@ant-design/icons';
import { parseDate } from "./helper"

export default function TaskPage() {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const loadData = () => {
    setLoading(true)
    fetch("https://quickdb-2ee9.restdb.io/rest/task", {
      method: "get",
      headers: {
        "x-apikey": "612f656c43cedb6d1f97eb93",
      },
    }).then(res => res.json()).then(result => {
      setData(result)
      setLoading(false)
    })
  }

  const setDonetask = (id, val) => {
    fetch("https://quickdb-2ee9.restdb.io/rest/task/" + id, {
      method: "put",
      headers: {
        "x-apikey": "612f656c43cedb6d1f97eb93",
      },
      body: JSON.stringify({ data: { is_done: !val } })
    }).then(res => res.json()).then(result => {
      loadData()
    })
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <>
      <Card className="panel" size="small">
        <div>
          <Select style={{ width: 200 }} placeholder="My task">
            <Select.Option value="1">Optional Errand</Select.Option>
            <Select.Option value="2">Urgent Todo</Select.Option>
          </Select>
          <div style={{ float: 'right' }}>
            <Button type="primary">New Task</Button>
          </div>

        </div><br />
        <Spin spinning={loading}>
          <Collapse bordered={false} expandIconPosition="right" style={{ background: "#fff" }}>
            {data.map((item, i) => (
              <Collapse.Panel header={<>
                <Checkbox style={{ marginRight: 15 }} defaultChecked={item.is_done} onChange={() => setDonetask(item._id, item.is_done)} />
                <span className={item.is_done === true ? "done-task" : ""}>
                  {item.subject}
                </span>
              </>}
                key={i}
                extra={<>
                  <span className="text-danger" style={{ marginRight: 15 }}>
                    {parseDate(item.due_date)}
                  </span>
                  <EllipsisOutlined />
                </>}
              >
                <div style={{ marginLeft: 30 }}>
                  <div style={{ marginBottom: 5 }}>
                    <ClockCircleOutlined className="text-primary" style={{ marginRight: 15 }} />
                    <DatePicker size="small" defaultPickerValue={item.due_date} format="DD/MM/YYYY HH:mm:ss" />
                  </div>
                  <div>
                    <Row>
                      <Col span={2}>
                        <EditOutlined className="text-primary" />
                      </Col>
                      <Col span={22}>
                        {item.description}
                      </Col>
                    </Row>
                  </div>
                </div>

              </Collapse.Panel>
            ))}
          </Collapse>

        </Spin>

      </Card>

    </>
  )
}