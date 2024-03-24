import { login } from '@/api/login'
import loginImg from '@/assets/login_bg.png'
import useRequest from '@/hooks/useRequest'
import { useBoundStore } from '@/store'
import { Button, Checkbox, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'

interface LoginField {
  username: string
  password: string
  remember: boolean
}

function Login() {
  const setToken = useBoundStore((s) => s.setToken)
  const navigate = useNavigate()
  const { run: runLogin } = useRequest(login, { manual: true })

  const onFinish = async (values: LoginField) => {
    const data = await runLogin(values)
    setToken(data!)
    navigate('/')
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className="container h-dvh px-6 mx-auto flex items-center justify-items-center space-x-5">
      <img src={loginImg} className="" alt="" />
      <div className="px-5 py-5 border border-solid border-gray-800">
        <div className="text-3xl font-bold text-center mb-4">
          tlias 智能学习辅助系统
        </div>
        <Form
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<LoginField>
            label="Username"
            name="username"
            rules={[
              { required: false, message: 'Please input your username!' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<LoginField>
            label="password"
            name="password"
            rules={[
              { required: false, message: 'Please input your password!' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<LoginField> name="remember" valuePropName="checked">
            <Checkbox>记住密码</Checkbox>
          </Form.Item>

          <Form.Item className="text-center mb-0">
            <Button type="primary" htmlType="submit">
              登 陆
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
