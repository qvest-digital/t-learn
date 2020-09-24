<template>
    <div>
        <Header />
        <p>test</p>
        <div class="app-container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import Header from './components/Header';

export default {
    name: 'App',
    components: { Header }
};
</script>

<style lang="scss" rel="stylesheet/scss">
p {
    color: $tarent-red;
}
</style>
