<template>
    <div class="navbar-container">
        <div class="logo-container">
            <img src="../assets/images/tarent-logo-white.svg" />
        </div>
        <router-link tag="span" class="nav-link" to="/">
            t-learn
        </router-link>

        <router-link
            tag="span"
            class="nav-link"
            :to="{ name: 'courseCreation' }"
        >
            Anlegen
        </router-link>
        <input type="search" class="search" placeholder="Suche" />
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.navbar-container {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 0 0 $xxxl-space 0;
    padding: 0 $s-space;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.21);
    height: 58px;
}

.nav-link {
    color: $black;
    margin-left: $m-space;
    font-size: $l-font;
    font-weight: $normal;
    cursor: pointer;
    &.router-link-exact-active {
        font-weight: $bold;
        padding-top: $s-space;
        padding-bottom: $s-space;
        border-bottom: 2px solid $dark-red;
    }
}
.search {
    margin-left: $l-space;
    flex-grow: 1;
    max-width: 964px;
    height: 30px;
    font-size: $m-font;
    background-color: $light-grey;
    border-radius: 20px;
    padding: $s-space $xxl-space;
    outline: none;
    border: 1px solid $light-grey;
    background-image: url('../assets/images/search.svg');
    background-repeat: no-repeat;
    background-position: $s-space center;
    outline: 0;
}
</style>
