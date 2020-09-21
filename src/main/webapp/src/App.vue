<template>
    <div>
        <Header />
        <b-container class="pt-5">
            <router-view></router-view>
        </b-container>
        <footer class="container-fluid bg-light text-center mt-4">
            <span class="text-muted">
                <a class="link-secondary" href="/privacy-policy"
                    >Privacy Policy</a
                >
                | <a class="link-secondary" href="/impressum">Impressum</a>
            </span>
        </footer>
    </div>
</template>

<script>
import Header from './components/Header';
export default {
    name: 'App',
    components: { Header }
};
</script>

<style></style>
