import { Layout, Spin } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Content } from 'antd/es/layout/layout'
import { Suspense, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import SysHeader from './SysHeader'
import SysMenu from './SysMenu'
import { useLoginStore, useSpinStore } from '@/store'

function SysLayout() {
  const { isLogin } = useLoginStore()
  const { spinning } = useSpinStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLogin) {
      navigate('/login')
    }
  }, [])

  return (
    <Layout className="w-dvw">
      <Sider width="25%" className="h-dvh overflow-y-auto">
        <SysMenu />
      </Sider>
      <Layout className="h-dvh overflow-auto">
        <SysHeader />
        <Content className="p-3">
          <Spin spinning={spinning} fullscreen />
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  )
}

export default SysLayout
