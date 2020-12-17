//test
export const setToken = ({commit},payload) => {
    commit('SETTOKEN',payload)
}
export const setUrlData = ({commit},payload) => {
    commit('SETURLDATA',payload)
}
export const increment = ({commit}) => {
    commit('INCREMENT')
}
export const decrement = ({commit}) => {
    commit('DECREMENT')
}
export const saveUserInfo = ({commit},payload) => {
    commit('SAVEUSERINFO',payload)
}
export const logOut = ({commit}) => {
    commit('LOGOUT')
}