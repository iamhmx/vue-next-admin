import { createApp, h } from 'vue'
import App from './App.vue'
import './index.less'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import './permission'

import { setupRouter } from './router/index'
import { setupStore } from './store/index'

import { setupProdMockServer } from './mockProdServer'

const app = createApp(App)
app.use(Antd)
setupRouter(app)
setupStore(app)
app.mount('#app')

// production mock server
if (process.env.NODE_ENV === 'production') {
	setupProdMockServer()
}
