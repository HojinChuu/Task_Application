<template>
    <div>
        <Toolbar />
        <List />
        <RefreshBtn />
    </div>
</template>

<script>
import Toolbar from '../components/Task/Toolbar';
import List from '../components/Task/List';
import RefreshBtn from '../components/Task/RefreshBtn';

export default {
    name: "Task",
    components: { Toolbar, List, RefreshBtn }
}
</script>
