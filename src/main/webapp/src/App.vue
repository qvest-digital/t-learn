<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <b-container fluid>
                <router-link class="navbar-brand py-0" to="/">
                    t-learn
                </router-link>
                <button
                    class="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div
                    class="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul class="navbar-nav mr-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <router-link class="nav-link" to="/"
                                >Übersicht</router-link
                            >
                        </li>
                        <li class="nav-item">
                            <router-link
                                class="nav-link"
                                :to="{
                                    name: 'courseCreation'
                                }"
                                >Anlegen</router-link
                            >
                        </li>
                    </ul>
                </div>
            </b-container>
        </nav>
        <b-container class="pt-5">
            <router-view></router-view>
        </b-container>
        <footer class="container-fluid bg-light text-center mt-4">
            <span class="text-muted">
                <a class="link-secondary" href="/privacy-policy"
                    >Privacy Policy</a
                >
                |
                <a class="link-secondary" href="/impressum">Impressum</a>
            </span>
        </footer>
    </div>
</template>

<script>
export default {
    name: 'App',
    components: {}
};
</script>

<style></style>
