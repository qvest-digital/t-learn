<template>
    <div class="header-container">
        <div class="navbar-container">
            <div class="logo-container">
                <img src="../assets/images/tarent-logo-white.svg" />
            </div>
            <router-link
                title="Übersicht aller Verstanstaltungen"
                tag="div"
                class="nav-link"
                to="/"
            >
                <img class="navbar-icon" src="../assets/images/t-learn.svg" />
                t-learn
            </router-link>

            <router-link
                tag="div"
                class="nav-link"
                title="Veranstaltung erstellen"
                :to="{ name: 'courseCreation' }"
            >
                <img class="navbar-icon" src="../assets/images/create.svg" />

                Erstellen
            </router-link>
        </div>
        <input type="search" class="search" placeholder="Suche" />
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: $space-xxxl;
    padding: 0 $space-s;
    box-shadow: $component-shadow;
}
.navbar-container {
    display: flex;
    align-items: center;
    height: 58px;
}

.navbar-icon {
    padding-right: $space-s;
}

.nav-link {
    color: $black;
    padding: 0 $space-s;
    font-size: $font-m;
    font-weight: $normal;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
    &.router-link-exact-active {
        border-bottom: solid $dark-red;
    }
}
.search {
    width: 400px;
    height: 40px;
    font-size: $font-m;
    background-color: $light-grey;
    border-radius: $border-radius-l;
    padding: $space-s $space-xxl;
    border: 1px solid $light-grey;
    background-image: url('../assets/images/search.svg');
    background-repeat: no-repeat;
    background-position: $space-s center;
    outline: 0;
}
.logo-container {
    margin-right: $space-m;
}
</style>
