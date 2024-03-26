import { deleteEmp, Emp, getEmps } from '@/api/emps'
import { Gender, Job } from '@/enums/emp'
import useRequest from '@/hooks/useRequest'
import {
  Button,
  DatePicker,
  Form,
  Image,
  Input,
  Popconfirm,
  Select,
  Space,
  Table,
  TableProps,
} from 'antd'
import type { Dayjs } from 'dayjs'
import { assoc, dissoc, evolve, pipe } from 'ramda'
import { Key, useEffect, useState } from 'react'
import EmpModal from './EmpModal'
import { formatDate } from '@/utils/antdUtils'

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

function Users() {
  const [form] = Form.useForm<EmpFilter>()

  const handleGetList = () => {
    const values = form.getFieldsValue()
    const [begin, end] = values.entrydate ?? []
    const data = pipe(
      assoc('begin', formatDate(begin)),
      assoc('end', formatDate(end)),
      assoc('page', page),
      assoc('pageSize', pageSize),
      dissoc('entrydate')
    )(values)

    run(data)
  }

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  useEffect(() => {
    handleGetList()
  }, [page, pageSize])

  const initialQuery = {
    page,
    pageSize,
  }

  const { data, run } = useRequest(getEmps, {
    defaultParams: [initialQuery],
  })
  const { total = 0, rows = [] } = data ?? {}

  const columns: TableProps<Emp>['columns'] = [
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '图像',
      dataIndex: 'image',
      render: (image) => (
        <Image
          width={50}
          height={50}
          src={image}
          fallback="data:image/png;base64,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"
        />
      ),
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
            onConfirm={() => handleDelete([record.id])}
            okText="确定"
            cancelText="取消"
          >
            <a className="text-blue-500">删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  const handleAdd = () => {
    setInitialValues(undefined)
    setOpen(true)
  }

  const handleUpdate = (record: Emp) => {
    setInitialValues(record)
    setOpen(true)
  }

  const { run: runDelete } = useRequest(deleteEmp, { manual: true })

  const handleDelete = async (ids: number[]) => {
    await runDelete(ids)
    handleGetList()
  }

  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([])

  const handleBatchDelete = () => {
    handleDelete(selectedRowKeys as number[])
  }

  const [open, setOpen] = useState(false)
  const [initialValues, setInitialValues] = useState<Emp>()

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
        <Button type="primary" className="me-3" onClick={handleAdd}>
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
        tableLayout="fixed"
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
      <EmpModal
        open={open}
        setOpen={setOpen}
        initialValues={initialValues}
        onSuccess={handleGetList}
      />
    </div>
  )
}

export default Users
