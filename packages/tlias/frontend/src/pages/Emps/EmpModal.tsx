import { getDepts } from '@/api/depts'
import { addEmp, Emp, updateEmp } from '@/api/emps'
import ImageUpload from '@/components/ImageUpload'
import { Gender, Job } from '@/enums/emp'
import useRequest from '@/hooks/useRequest'
import { modify } from '@/utils'
import {
  enums2options as enum2options,
  formatDate,
  list2options,
  parseDate,
} from '@/utils/antdUtils'
import { DatePicker, Form, Input, Modal, Select } from 'antd'
import { useEffect, useState } from 'react'

export interface EmpModalProps {
  initialValues?: Emp
  open: boolean
  setOpen: (open: boolean) => void
  onSuccess: () => void
}

function EmpModal({ initialValues, open, setOpen, onSuccess }: EmpModalProps) {
  const [form] = Form.useForm<Emp>()
  const [title, setTitle] = useState<string>()
  const { data: depts = [] } = useRequest(getDepts)
  const { run: runAdd } = useRequest(addEmp, { manual: true })
  const { run: runUpdate } = useRequest(updateEmp, { manual: true })

  const handleOk = async () => {
    const values = await form.validateFields()
    values.entrydate = formatDate(values.entrydate)
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
      form.setFieldsValue(modify('entrydate', parseDate, initialValues))
      setTitle('编辑员工')
    } else {
      form.resetFields()
      setTitle('新增员工')
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
          name="username"
          label="用户名"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="name"
          label="员工姓名"
          rules={[{ required: true, message: '请输入员工姓名' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="gender"
          label="性别"
          rules={[{ required: true, message: '请选择性别' }]}
        >
          <Select options={enum2options(Gender)} />
        </Form.Item>
        <Form.Item name="image" label="图像">
          <ImageUpload />
        </Form.Item>
        <Form.Item name="job" label="职位">
          <Select options={enum2options(Job)} />
        </Form.Item>
        <Form.Item name="entrydate" label="入职日期">
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item name="deptId" label="归属部门">
          <Select options={list2options('id', 'name', depts)} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default EmpModal
