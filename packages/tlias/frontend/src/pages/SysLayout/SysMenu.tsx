import {
  ClusterOutlined,
  DesktopOutlined,
  TeamOutlined,
} from '@ant-design/icons'
import { Menu } from 'antd'
import { SubMenuType } from 'antd/es/menu/hooks/useItems'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const items: SubMenuType[] = [
  {
    key: 'aa0',
    label: '班级学员管理',
    icon: <TeamOutlined />,
    children: [
      {
        key: 'aa1',
        label: '班级管理',
      },
      {
        key: 'aa2',
        label: '学员管理',
      },
    ],
  },
  {
    key: 'aa3',
    label: '系统信息管理',
    icon: <ClusterOutlined />,
    children: [
      {
        key: '/depts',
        label: '部门管理',
      },
      {
        key: 'aa5',
        label: '员工管理',
      },
    ],
  },
  {
    key: 'aa6',
    label: '数据统计管理',
    icon: <DesktopOutlined />,
    children: [
      {
        key: 'aa7',
        label: '员工信息统计',
      },
    ],
  },
]

function SysMenu() {
  const { pathname } = useLocation()
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [openKeys, setOpenKeys] = useState<string[]>([])

  useEffect(() => {
    for (const item of items!) {
      if (item?.children) {
        for (const child of item.children) {
          if (child?.key === pathname) {
            setOpenKeys([item.key])
            setSelectedKeys([child.key])
            return
          }
        }
      }
    }
  }, [pathname])

  const navigator = useNavigate()

  function onClick({ key }: { key: string }) {
    navigator(key)
  }

  return (
    <Menu
      className="w-full"
      defaultOpenKeys={openKeys}
      mode="inline"
      items={items}
      theme="dark"
      selectedKeys={selectedKeys}
      onClick={onClick}
    />
  )
}

export default SysMenu
