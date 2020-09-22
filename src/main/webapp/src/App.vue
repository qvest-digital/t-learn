<template>
    <div>
        <Header />
        <b-container class="pt-5">
            <router-view></router-view>
        </b-container>
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

<style></style>
