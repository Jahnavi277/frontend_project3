import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

function Layout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ marginLeft: '220px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Topbar />
        <div style={{ padding: '28px', flex: 1 }}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout