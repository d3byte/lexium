<template>
<div class="main">
    <div class="wrapper">
        <div class="title">Ошибка 404</div>
        <div class="sub-title">К сожалению, такой страницы нет :(</div>
        <div class="proposal">Может вы искали одну из этих страниц?</div>
        <ul class="links">
            <li>Авторизация</li> |
            <li>Регистрация</li> |
            <li>Профиль</li>
        </ul>
    </div>
</div>
</template>

<script>
</script>

<style lang="sass" scoped>
.main
    display: flex
    align-items: center
    justify-content: center
    position: relative
    height: 100vh

.wrapper
    font-family: 'ProximaNova-Regular', sans-serif
    color: #595959
    text-align: center
    .title
        font-family: 'ProximaNova-Semibold', sans-serif
        font-size: 64px
        margin-bottom: 20px

    .sub-title, .proposal
        font-size: 36px
        margin-bottom: 20px

    .links
        list-style-type: none
        display: flex
        justify-content: space-around
        align-items: center
        margin: 0
        padding: 0
        font-size: 40px
        font-family: 'ProximaNova-Light', sans-serif
        &:hover
            cursor: default
        li
            font-family: 'ProximaNova-Semibold', sans-serif
            font-size: 24px
            margin: 0
            transition: 0.2s
            color: #6B6DB8
            &:hover
                cursor: pointer
                color: #8686DA


@media (max-width: 780px)
    .wrapper
        .title
            font-size: 46px

        .sub-title, .proposal
            font-size: 23px

        .links
            font-size: 26px
            li
                font-size: 16px

@media (max-width: 400px)
    .wrapper
        .title
            font-size: 36px

        .sub-title, .proposal
            font-size: 18px

        .links
            font-size: 23px
            li
                font-size: 16px
</style>