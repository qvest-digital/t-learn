<template>
    <div>
        <Header />
        <div class="app-container">
            <router-view></router-view>
        </div>
        <Footer />
    </div>
</template>

<script>
import Header from './components/Header';
import Footer from './components/Footer';

export default {
    name: 'App',
    components: { Header, Footer }
};
</script>

<style lang="scss" scoped></style>
