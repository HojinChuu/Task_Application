const getters = {
    accessToken(state) { 
      return state.tokenInfo.access_token
    },
    refreshToken(state) { 
      return state.tokenInfo.refresh_token
    },
    sessionID(state) { 
      return state.tokenInfo.session_id
    },
  }
  
  export default getters