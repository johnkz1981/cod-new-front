export const state = () => ({
  active: false,
  message: '',
});

export const mutations = {

  setToast(state, activeMessage) {
    state.active = activeMessage.active;
    state.message = activeMessage.message;
  }
};

export const actions = {

  showToast({commit}, message, defaultTimeout = 3000) {

    commit('setToast', {message, active: true});

    setTimeout(() => {
      commit('setToast', {message: '', active: false});
    }, defaultTimeout);
  },
};

export const getters = {
  toastActive: s => s.active,
  toastMessage: s => s.message,
};