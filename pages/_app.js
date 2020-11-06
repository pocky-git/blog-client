import {Provider} from 'react-redux'

import store from '../redux/store'
import 'antd/dist/antd.css'
import '../styles/pages/globals.less'

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
