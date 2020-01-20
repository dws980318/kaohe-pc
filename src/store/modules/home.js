const state = {
    open: true,
    user: {
        name: sessionStorage.getItem('name'),
        password: sessionStorage.getItem('password'),
    }
};

const mutations = {
    setOpen(state, params) {
        localStorage.setItem('open', params)
        state.open = params
    },
    SET_user(state, data) {
        // 把用户名存起来
        state.user = data;
        sessionStorage.setItem("name", data.name)
        sessionStorage.setItem("password", data.password)
    },
};

export default {
    // namespaced: true,
    state,
    mutations,
};
