import * as api from '../api'

const actions = {

  // AUTH
  REGISTER(_, register_info) {
    return api.auth.register(register_info)
  },
  LOGIN({commit}, login_info) {
    return api.auth.login(login_info)
    .then(res => {
      commit('LOGIN', res.data)
    })  
  },
  LOGOUT({commit}, logout_info) {
    return api.auth.logout(logout_info)
    .then(() => {
      commit('LOGOUT')
    })
  },
  REFRESH_TOKEN({commit}, refresh_token_info) {
    console.log(refresh_token_info)
    return api.auth.refreshToken(refresh_token_info)
    .then(res => {
      console.log(res)
      commit('REFRESH_TOKEN', res.data)
    })
  },

  // TASK
  FETCH_TASKS({commit}, tasks_info) {
    return api.task.getTasks(tasks_info)
    .then(res => {
      commit('FETCH_TASKS', res.data)
    })
  },
  FETCH_COMPLETED({commit}, completed_info) {
    return api.task.getCompleted(completed_info)
    .then(res => {
      commit('FETCH_COMPLETED', res.data)
    })
  },
  FETCH_INCOMPLETED({commit}, inCompleted_info) {
    return api.task.getInCompleted(inCompleted_info)
    .then(res => {
      commit('FETCH_INCOMPLETED', res.data)
    })
  },
  REMOVE_TASK(_, task_info) {
    return api.task.removeTask(task_info)
  },
  COMPLETE_TOGGLE(_, complete_info) {
    return api.task.completeToggle(complete_info)
  },
  UPDATE_TASK(_, task_info) {
    return api.task.updateTask(task_info)
  },
  ADD_TASK(_, task_info) {
    return api.task.addTask(task_info)
  },
  ADD_IMAGE(_, image_info) {
    return api.task.createImage(image_info)
  },
  FETCH_IMAGE_FILE(_, image_info) {
    return api.task.getImageFile(image_info)
  },
  REMOVE_IMAGE(_, image_info) {
    return api.task.removeImage(image_info)
  }
}

export default actions