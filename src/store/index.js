import Vue from "vue"
import Vuex from "vuex"
import state     from './state'
import getters   from './getters'
import mutations from './mutations'
import actions   from './actions'

Vue.use(Vuex);

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {}
})

if(sessionStorage.key('tokenInfo')) {
  const tokenInfo = sessionStorage.getItem('tokenInfo')
  store.commit('LOGIN', JSON.parse(tokenInfo))
}

export default store