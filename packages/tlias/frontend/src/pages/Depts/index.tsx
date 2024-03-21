import { Dept, deleteDept, getDepts } from '@/api/depts'
import useRequest from '@/hooks/useRequest'
import { Button, Popconfirm, Space, Table } from 'antd'
import { ColumnType } from 'antd/es/table'
import { useState } from 'react'
import DeptModal from './DeptModal'

function Depts() {
  const { data, run } = useRequest(getDepts)

  const columns: ColumnType<Dept>[] = [
    {
      title: '序号',
      key: 'id',
      render: (_, __, index) => index + 1,
    },
    {
      title: '部门名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '最后操作时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
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

  const [initialValues, setInitialValues] = useState<Dept>()

  const handleAdd = () => {
    setInitialValues(undefined)
    setOpen(true)
  }

  const handleUpdate = (record: Dept) => {
    setInitialValues(record)
    setOpen(true)
  }

  const { run: runDelete } = useRequest(deleteDept, { manual: true })

  const handleDelete = async (id: number) => {
    await runDelete(id)
    run()
  }

  const [open, setOpen] = useState(false)

  return (
    <div>
      <div className="mb-3">
        <Button type="primary" onClick={handleAdd}>
          新增部门
        </Button>
      </div>
      <Table
        rowKey="id"
        dataSource={data}
        columns={columns}
        pagination={false}
      />
      <DeptModal
        open={open}
        setOpen={setOpen}
        initialValues={initialValues}
        onSuccess={run}
      />
    </div>
  )
}

export default Depts
