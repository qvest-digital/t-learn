<template>
    <div class="navbar-container">
        <router-link tag="span" class="header-logo" to="/">
            t-learn
        </router-link>

        <div class="header-content">
            <router-link tag="span" class="nav-link" to="/"
                >Übersicht</router-link
            >
            <router-link
                tag="span"
                class="nav-link"
                :to="{ name: 'courseCreation' }"
            >
                Anlegen
            </router-link>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style scoped></style>
