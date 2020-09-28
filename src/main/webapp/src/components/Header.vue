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
    margin: 0 0 $xxxl-space 0;
    padding: 0 $s-space;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.21);
}
.navbar-container {
    display: flex;
    align-items: center;
    height: 58px;
}

.navbar-icon {
    padding-right: $s-space;
}

.nav-link {
    color: $black;
    padding: 0 $s-space;
    font-size: $m-font;
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
.logo-container {
    margin-right: $m-space;
}
</style>
