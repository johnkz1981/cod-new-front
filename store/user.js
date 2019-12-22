export const state = () => ({
  user: {},
  info: {}
});

export const mutations = {

  setUser(state, user) {
    state.user = user
  },

  setInfo(state, info) {
    state.info = info
  }
};

export const actions = {

  async fetch({commit}){

    const user = await this.$axios.$get('/api/v1/personal/getData');
    commit('setUser', user);
  },

  async getInfo({commit}) {

    const info = await this.$axios.$get('/api/v1/personal/getInfo');
    commit('setInfo', info.result);
  },

  async set({commit}, {setter, data}) {

    await this.$axios.$post(`/api/v1/personal/set${setter}`, data);
    this.dispatch('toaster/showToast', 'Информация сохранена', 1000);
  },
};

export const getters = {
  user: s => s.user,
  isLogged: s => !!s.user.userInfo,
  info: s => s.info,
};