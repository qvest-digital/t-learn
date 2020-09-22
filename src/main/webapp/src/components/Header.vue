<template>
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
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/"
                            >Übersicht</router-link
                        >
                    </li>
                    <li class="nav-item">
                        <router-link
                            class="nav-link"
                            :to="{ name: 'courseCreation' }"
                            >Anlegen</router-link
                        >
                    </li>
                </ul>
            </div>
        </b-container>
    </nav>
</template>

<script>
export default {};
</script>

<style scoped></style>
