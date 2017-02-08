import preact from 'preact'
import Settings from './Settings'
import Credentials from './Credentials'
import Synchronization from './Synchronization'

export default function MooltipassMenu ({ activeMenu, navigateTo }) {
  return (
    <nav className='menu'>
      <a
        className={`menu-item ${activeMenu === 'Settings' ? 'active' : ''}`}
        onClick={() => navigateTo(Settings)}
      >
        Settings
      </a>
      <a
        className={`menu-item ${activeMenu === 'Credentials' ? 'active' : ''}`}
        onClick={() => navigateTo(Credentials)}
      >
        Credentials
      </a>
      <a
        className={`menu-item ${activeMenu === 'Synchronization' ? 'active' : ''}`}
        onClick={() => navigateTo(Synchronization)}
      >
        Synchronization
      </a>
    </nav>
  )
}
