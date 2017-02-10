import preact from 'preact'
import MooltipassMenu from './MooltipassMenu'
import Settings from './Settings'

import HID from 'node-hid'

require('../app.scss')

class MooltipassApp extends preact.Component {
  constructor (props) {
    super(props)

    this.state = {
      page: Settings
    }
  }

  navigateTo (page) {
    this.setState({ page })
  }

  render (props, state) {
    const Page = state.page
    const devices = HID.devices()
    return (
      <div>
        <MooltipassMenu
          activeMenu={state.page.name}
          navigateTo={this.navigateTo.bind(this)}
        />
        <table>
          {devices.map((device, index) => (
            <tr key={index}>
              <td>{device.vendorId}</td>
              <td>{device.productId}</td>
              <td>{device.product}</td>
              <td>{device.manufacturer}</td>
              <td>{device.serialNumber}</td>
              <td>{device.path}</td>
            </tr>
          ))}
        </table>
      </div>)
    }
  }

  export default MooltipassApp
