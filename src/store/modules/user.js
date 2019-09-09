const state = {
  login: "",
  password: "",
  id: ""
};

const actions = {
  // eslint-disable-next-line no-unused-vars
  setLogin({ state, commit }, login) {
    commit("setLogin", login);
  },

  // eslint-disable-next-line no-unused-vars
  setPassword({ state, commit }, password) {
    commit("setPassword", password);
  },

  // eslint-disable-next-line no-unused-vars
  setId({ state, commit }, id) {
    commit("setId", id);
  }
};

const mutations = {
  setLogin(state, login) {
    state.login = login;
  },

  setPassword(state, password) {
    state.password = password;
  },

  setId(state, id) {
    state.id = id;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
