import reactSvg from '@/assets/react.svg'
import { useBoundStore } from '@/store'
import { UserOutlined } from '@ant-design/icons'
import { Avatar, Dropdown, MenuProps, Space } from 'antd'
import { Header } from 'antd/es/layout/layout'
import { useNavigate } from 'react-router-dom'

function SysHeader() {
  const setToken = useBoundStore((s) => s.setToken)
  const navigator = useNavigate()

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: '退出登录',
      onClick() {
        setToken('')
        navigator('/login')
      },
    },
  ]

  return (
    <Header className="text-center text-white h-16 bg-00152A flex justify-between items-center">
      <img src={reactSvg} alt="" />
      <Dropdown menu={{ items }}>
        <Space>
          <Avatar size="large" icon={<UserOutlined />} />
        </Space>
      </Dropdown>
    </Header>
  )
}

export default SysHeader
