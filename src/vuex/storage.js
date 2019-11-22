import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    info_personal: {
      nombre: '',
      apellido_materno: '',
      apellido_paterno: '',
      fecha_nacimiento: '',
      sexo: ''
    },
    modal_info_usuario: false
  },

  actions: {
    userLogged ({commit}, user) {
      commit('USER_LOGGED', user);
    }
  },

  mutations: {
    USER_LOGGED (state, user) {
      state.user = user;
    }
  },
});