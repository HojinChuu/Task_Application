const mutations = {

	// AUTH
	LOGIN(state, tokenInfo) {
		state.tokenInfo = tokenInfo
		sessionStorage.setItem("tokenInfo", JSON.stringify(tokenInfo))
	},
	LOGOUT() {
		sessionStorage.removeItem("tokenInfo")
	},
	REFRESH_TOKEN(state, tokenInfo) {
		state.tokenInfo = tokenInfo
		sessionStorage.removeItem("tokenInfo")
		sessionStorage.setItem("tokenInfo", JSON.stringify(tokenInfo))
	},

	// TASK
	FETCH_TASKS(state, tasksInfo) {
		state.tasks = tasksInfo.tasks
		state.tasks_count = tasksInfo.rows_returned
	},
	FETCH_COMPLETED(state, completedInfo) {
		state.tasks = completedInfo.tasks
		state.tasks_count = completedInfo.rows_returned
	},
	FETCH_INCOMPLETED(state, inCompletedInfo) {
		state.tasks = inCompletedInfo.tasks
		state.tasks_count = inCompletedInfo.rows_returned
	}
}

export default mutations