import * as api from '../api';

const actions = {
    REGISTER(_, register_info) {
        return api.auth.register(register_info)
    }
}

export default actions;