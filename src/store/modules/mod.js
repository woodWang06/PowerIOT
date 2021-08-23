export default {
  state: {
    cancelTokenArr: [] // 存储cancel token
  },
  mutation: {
    addCancelToken({ cancelTokenArr }, data) {
      cancelTokenArr.push(data)
    },
    clearCancelToken(state) {
      state.cancelTokenArr.map(item => {
        item.cancel(`${item.url}---路由切换取消请求`)
      })
      state.cancelTokenArr = []
    }
  },
  actions: {},
  getters: {}
}