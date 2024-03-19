import { Emp, getEmps } from '@/api/emps'
import useRequest from '@/hooks/useRequest'
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Table,
  TableProps,
} from 'antd'
import { assoc, dissoc, pipe } from 'ramda'
import { useState } from 'react'

const genderOptions: {
  value: string
  label: JSX.Element
}[] = [
  { value: '', label: <span>请选择</span> },
  { value: '1', label: <span>男</span> },
  { value: '2', label: <span>女</span> },
]

const columns: TableProps<Emp>['columns'] = [
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '图像',
    dataIndex: 'image',
  },
  {
    title: '性别',
    dataIndex: 'gender',
  },
  {
    title: '职位',
    dataIndex: 'job',
  },
  {
    title: '入职日期',
    dataIndex: 'entrydate',
  },
  {
    title: '最后操作时间',
    dataIndex: 'updateTime',
  },
]

function Users() {
  const [form] = Form.useForm()

  const handleGetList = (values: any) => {
    const [start, end] = values.entrydate
    const data = pipe(
      assoc('start', start?.format('YYYY-MM-DD')),
      assoc('end', end?.format('YYYY-MM-DD')),
      dissoc('entrydate')
    )(values)
    console.log(data)
  }

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(0)

  const initialValues = {
    page,
    pageSize,
  }

  const { data, run } = useRequest(getEmps, {
    defaultParams: [initialValues],
  })

  return (
    <div>
      <Form
        layout="inline"
        form={form}
        initialValues={initialValues}
        className="justify-between mb-3"
        onFinish={handleGetList}
      >
        <Form.Item label="姓名" name="name">
          <Input placeholder="请输入员工姓名" />
        </Form.Item>
        <Form.Item label="性别" name="gender" className="w-32">
          <Select options={genderOptions} />
        </Form.Item>
        <Form.Item label="入职时间" name="entrydate">
          <DatePicker.RangePicker />
        </Form.Item>
        <Form.Item className="me-0!important">
          <Button type="primary" htmlType="submit">
            查询
          </Button>
        </Form.Item>
      </Form>
      <Table
        columns={columns}
        rowKey="id"
        dataSource={data?.rows}
        pagination={{
          current: page,
          total,
          pageSize,
        }}
      />
    </div>
  )
}

export default Users
