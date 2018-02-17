<template>
    <header :class="className">
        <img class="logo" src="@/assets/Lexium.png">
        <ul v-if="className == 'isLoggedIn'" class="navigation">
            <li class="search">
                <i class="material-icons">search</i>
            </li>
            <li class="notifications">
                <i class="material-icons">bookmark</i>
            </li>
            <li>
                <i class="material-icons">reorder</i>
            </li>
        </ul>
    </header>
</template>

<script>

export default {
    name: 'Header',
    data() {
        return {
            class: '',
            route: ''
        }
    },
    created() {
        const route = this.$route.path
        switch (route) {
            case '/signin':
            case '/signup':
                this.className = 'isNotLoggedIn'
                this.route = route
                break
            default:
                this.className = 'isLoggedIn'
                this.rotue = route
        }
    },
}
</script>

<style lang="sass" scoped>
header
    display: flex
    align-items: center
    background: white
    border-bottom: 1px solid #E0E0E0
    height: 60px
    padding: 0 160px

    &.isNotLoggedIn
        justify-content: center

    &.isLoggedIn
        justify-content: space-between

    .logo
        transform: scale(0.8)

    .navigation
        display: flex
        align-items: center
        justify-content: space-between
        list-style-type: none
        margin: 0
        padding: 0
        li
            display: flex
            align-items: center
            margin-right: 20px
            i
                opacity: 0.6
                transition: 0.2s
                &:hover
                    opacity: 0.7
                    cursor: pointer

</style>