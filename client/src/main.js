import Vue from 'vue'
import { ApolloClient, createBatchingNetworkInterface } from 'apollo-client'
import VueApollo from 'vue-apollo'

// App
import App from './App.vue'

// Modules
import router from './router'
import store from './store'

Vue.config.productionTip = false

// Apollo
const networkInterface = createBatchingNetworkInterface({
  uri: 'http://localhost:4000'
})

const apolloClient = new ApolloClient({
  networkInterface,
  connectToDevTools: true
})

Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  defaultOptions: {
    $loadingKey: 'loading'
  }
})

new Vue({
  apolloProvider,
  router,
  store,
  render: h => h(App),
}).$mount('#app')
