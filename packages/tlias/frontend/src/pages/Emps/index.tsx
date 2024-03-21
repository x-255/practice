import { Emp, getEmps } from '@/api/emps'
import useRequest from '@/hooks/useRequest'
import {
  Button,
  DatePicker,
  Form,
  Input,
  Popconfirm,
  Select,
  Space,
  Table,
  TableProps,
} from 'antd'
import type { Dayjs } from 'dayjs'
import { assoc, pipe } from 'ramda'
import { Key, useEffect, useState } from 'react'

interface EmpFilter {
  name?: string
  gender?: number
  entrydate?: [Dayjs, Dayjs]
}

const genderOptions: {
  value: string
  label: JSX.Element
}[] = [
  { value: '', label: <span>请选择</span> },
  { value: '1', label: <span>男</span> },
  { value: '2', label: <span>女</span> },
]

enum Gender {
  男 = 1,
  女 = 2,
}

enum Job {
  班主任 = 1,
  讲师 = 2,
  学工主管 = 3,
  教研主管 = 4,
  咨询师 = 5,
}

function Users() {
  const [form] = Form.useForm<EmpFilter>()

  const handleGetList = () => {
    const values = form.getFieldsValue()
    const [begin, end] = values.entrydate ?? []
    const data = pipe(
      assoc('begin', begin?.format('YYYY-MM-DD')),
      assoc('end', end?.format('YYYY-MM-DD')),
      assoc('page', page),
      assoc('pageSize', pageSize)
    )(values)

    run(data)
  }

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  useEffect(() => {
    handleGetList()
  }, [page, pageSize])

  const initialValues = {
    page,
    pageSize,
  }

  const { data, run } = useRequest(getEmps, {
    defaultParams: [initialValues],
  })
  const { total = 0, rows = [] } = data ?? {}

  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

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
      render: (_, { gender }) => Gender[gender],
    },
    {
      title: '职位',
      dataIndex: 'job',
      render: (_, { job }) => Job[job],
    },
    {
      title: '入职日期',
      dataIndex: 'entrydate',
    },
    {
      title: '最后操作时间',
      dataIndex: 'updateTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a className="text-blue-500" onClick={() => handleUpdate(record)}>
            编辑
          </a>
          <Popconfirm
            title="删除部门"
            description="您确定要删除该部门吗 ?"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <a className="text-blue-500">删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  const handleUpdate = (record: Emp) => {}

  const handleDelete = (id: number) => {}

  const handleBatchDelete = () => {
    console.log(selectedRowKeys)
  }

  return (
    <div>
      <Form
        layout="inline"
        form={form}
        initialValues={initialValues}
        className="mb-3"
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
        <Form.Item className="me-0!important ml-auto">
          <Button type="primary" htmlType="submit">
            查询
          </Button>
        </Form.Item>
      </Form>
      <div className="mb-3">
        <Button type="primary" className="me-3">
          新增员工
        </Button>
        <Button type="primary" danger onClick={handleBatchDelete}>
          批量删除
        </Button>
      </div>
      <Table
        columns={columns}
        rowKey="id"
        dataSource={rows}
        rowSelection={{
          selectedRowKeys,
          onChange: setSelectedRowKeys,
        }}
        pagination={{
          current: page,
          total,
          pageSize,
          showSizeChanger: true,
          onChange(page) {
            setPage(page)
          },
          onShowSizeChange(_, size) {
            setPageSize(size)
          },
        }}
      />
    </div>
  )
}

export default Users
