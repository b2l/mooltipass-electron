import preact from 'preact'

export default function Settings (props) {
  return (
    <div>
      <h1>
        Device settings - Firmware v1.2_mini
      </h1>

      <form>
        <section>
          <h2 className='section-label'>
            Keyboard Output
          </h2>
          <div className='section-content'>
            <div className='form-group'>
              <label htmlFor='keyboard'>
                Configured keyboard layout
                <select name='keyboard' id='keyboard'>
                  <option value='en_US'>en_US</option>
                  <option value='en_GB'>en_GB</option>
                  <option value='fr_FR'>fr_fr</option>
                </select>
              </label>
            </div>
            <div className='form-group checkbox'>
              <label htmlFor='slow_computer'>
                <input type='checkbox' id='slow_computer' />
                For slow computers: wait
                <select name='slow_time' id='slow_time'>
                  <option value='5'>5</option>
                  <option value='10'>10</option>
                  <option value='15'>15</option>
                  <option value='30'>30</option>
                  <option value='100'>100</option>
                </select>
                ms after each key press
              </label>
            </div>
            <div className='form-group checkbox'>
              <label htmlFor='after_login_ouptut'>
                <input type='checkbox' id='after_login_ouptut' />
                Send
                <select name='after_login_ouput_key' id='after_login_output_key'>
                  <option defaultSelected value='Tab'>Tab</option>
                  <option value='Enter'>Enter</option>
                  <option value='Space'>Space</option>
                </select>
              </label>
            </div>
            <div className='form-group checkbox'>
              <label htmlFor='after_password_ouptut'>
                <input type='checkbox' id='after_password_ouptut' />
                Send
                <select name='after_password_ouput_key' id='after_password_output_key'>
                  <option value='Tab'>Tab</option>
                  <option defaultSelected value='Enter'>Enter</option>
                  <option value='Space'>Space</option>
                </select>
              </label>
            </div>
          </div>
        </section>
        <section>
          <h2 className='section-label'>
            Inactivity
          </h2>
          <div className='section-content'>
            <div className='form-group'>
              <label htmlFor='cancel_after'>
                Cancel credentials request after
                <select name='cancel_after' id='cancel_after'>
                  <option value='5'>5</option>
                  <option value='10'>10</option>
                  <option value='15'>15</option>
                  <option value='30'>30</option>
                  <option value='100'>100</option>
                </select>
              </label>
            </div>
            <div className='form-group checkbox'>
              <label htmlFor='lock_after'>
                <input type='checkbox' id='lock_after' />
                Lock after
                <input type='text' name='lock_after_time' id='lock_after_time' />
                minutes inactivity
              </label>
            </div>
            <div className='form-group checkbox'>
              <label htmlFor='screensaver'>
                <input type='checkbox' id='screensaver' />
                Use screen saver
              </label>
            </div>
          </div>
        </section>
        <section>
          <h2 className='section-label'>
            Miscellaneous
          </h2>
          <div className='section-content'>
            <div className='form-group'>
              <label htmlFor='brightness'>
                Configure screen brightness
                <select name='brightness' id='brightness'>
                  <option value='20'>20</option>
                  <option value='35'>35</option>
                  <option value='50'>50</option>
                  <option value='65'>65</option>
                  <option value='80'>80</option>
                  <option value='100'>100</option>
                </select>
              </label>
            </div>
            <div className='form-group checkbox'>
              <label htmlFor='knock_feature'>
                <input type='checkbox' id='knock_feature' />
                Enable knock detecting feature with
                <select name='knock_feature_sensitivity' id='knock_feature_sensitivity'>
                  <option value='low'>low</option>
                  <option value='medium'>medium</option>
                  <option value='high'>high</option>
                </select>
                sensitivity
              </label>
            </div>
            <div className='form-group checkbox'>
              <label htmlFor='no_host_boot'>
                <input type='checkbox' id='no_host_boot' />
                Allow boot without host (e.g. usb battery / charger)
              </label>
            </div>
            <div className='form-group checkbox'>
              <label htmlFor='flash_screen'>
                <input type='checkbox' id='flash_screen' />
                Flash screen when input is required
              </label>
            </div>
            <div className='form-group checkbox'>
              <label htmlFor='tutorial'>
                <input type='checkbox' id='tutorial' />
                Enable device tutorial
              </label>
            </div>
          </div>
        </section>
      </form>
    </div>
  )
}
