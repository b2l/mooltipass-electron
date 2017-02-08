import preact from 'preact'
import MooltipassMenu from './MooltipassMenu'
import Settings from './Settings'

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
    return (
      <div>
        <MooltipassMenu
          activeMenu={state.page.name}
          navigateTo={this.navigateTo.bind(this)}
        />
        <Page />
      </div>
    )
  }
}

export default MooltipassApp
