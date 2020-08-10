<template>
    <div>
        <Toolbar :access_token="userinfo.access_token" :session_id="userinfo.session_id"/>
        <List :access_token="userinfo.access_token" />
        <RefreshBtn />
    </div>
</template>

<script>
import Toolbar from '../components/Task/TaskToolbar/Toolbar';
import List from '../components/Task/List';
import RefreshBtn from '../components/Task/RefreshBtn';

export default {
    name: "Task",
    components: { Toolbar, List, RefreshBtn },
    data() {
        return {
            userinfo: {}
        }
    },
    created(){
        this.userinfo = JSON.parse(sessionStorage.getItem('userinfo'));
    }
}
</script>
