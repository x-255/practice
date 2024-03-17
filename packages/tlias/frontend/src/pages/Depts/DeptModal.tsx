import { Dept, addDept, updateDept } from '@/api/depts'
import useRequest from '@/hooks/useRequest'
import { Form, Input, Modal } from 'antd'
import { useEffect, useState } from 'react'

export interface DeptModalProps {
  initialValues?: Dept
  open: boolean
  setOpen: (open: boolean) => void
  onSuccess: () => void
}

function DeptModal({
  initialValues,
  open,
  setOpen,
  onSuccess,
}: DeptModalProps) {
  const [form] = Form.useForm<Dept>()
  const [title, setTitle] = useState<string>()
  const { run: runAdd } = useRequest(addDept, { manual: true })
  const { run: runUpdate } = useRequest(updateDept, { manual: true })

  const handleOk = async () => {
    const values = await form.validateFields()
    setOpen(false)

    if (initialValues) {
      await runUpdate({ ...initialValues, ...values })
    } else {
      await runAdd(values)
    }

    onSuccess()
  }

  useEffect(() => {
    if (!open) return

    if (initialValues) {
      form.setFieldsValue(initialValues)
      setTitle('编辑部门')
    } else {
      form.resetFields()
      setTitle('新增部门')
    }
  }, [open])

  return (
    <Modal
      title={title}
      destroyOnClose
      forceRender
      open={open}
      okText="保存"
      cancelText="取消"
      onOk={handleOk}
      onCancel={() => setOpen(false)}
    >
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={initialValues}
        autoComplete="off"
      >
        <Form.Item
          name="name"
          label="部门名称"
          rules={[
            { required: true, message: '请输入部门名称' },
            { min: 2, max: 10, message: '长度为2-10位' },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default DeptModal
