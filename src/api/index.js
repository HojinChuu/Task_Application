import axios from 'axios'

const DOMAIN = 'http://localhost/restapi'
const UNAUTHORIZED = 401

const serverRequest = (method, url, data, headers) => {
  return axios({
    method,
    url: DOMAIN + url,
    data,
    headers
  })
  .then(response => response.data)
  .catch(err => {
    const {status} = err.response
    if (status === UNAUTHORIZED){
      console.log('401 ERR')
    }
  })
}

export const auth = {
  register(register_info) {
    return serverRequest('post', '/users', register_info.data, register_info.headers)
  },
  login(login_info) {
    return serverRequest('post', '/sessions', login_info.data, login_info.headers)
  },
  logout(logout_info) {
    return serverRequest('delete', `/sessions/${logout_info.session_id}`, undefined, logout_info.headers)
  },
  refreshToken(refresh_token_info) {
    return serverRequest('patch', `/sessions/${refresh_token_info.session_id}`, refresh_token_info.data, refresh_token_info.headers)
  }
}

export const task = {
  getTasks(tasks_info) {
    return serverRequest('get', '/tasks', undefined, tasks_info.headers)
  },
  getCompleted(completed_info) {
    return serverRequest('get', '/complete', undefined, completed_info.headers)
  },
  getInCompleted(inCompleted_info) {
    return serverRequest('get', '/incomplete', undefined, inCompleted_info.headers)
  },
  removeTask(task_info) {
    return serverRequest('delete', `/tasks/${task_info.task_id}`, undefined, task_info.headers)
  },
  completeToggle(complete_info) {
    return serverRequest('patch', `/tasks/${complete_info.task_id}`, complete_info.data, complete_info.headers)
  },
  updateTask(task_info) {
    return serverRequest('patch', `/tasks/${task_info.task_id}`, task_info.data, task_info.headers)
  },
  addTask(task_info) {
    return serverRequest('post', '/tasks', task_info.data, task_info.headers)
  }
}