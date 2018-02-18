<template>
  <div>
    <div class="home" v-show="!loading">
        <Header/>
        <div class="cards">
            <div class="card">
                <div class="card-header">Авторизация</div>
                <div class="card-body">
                    <input type="text" v-model="login" class="line-based" placeholder="Логин">
                    <input type="password" v-model="password" class="line-based" placeholder="Пароль">
                </div>
                <div class="card-footer">
                    <TheButton :clickHandler="submit" className="authorization" text="Войти" />
                </div>
            </div>
        </div>
    </div>
    <Loading v-if="loading"/>
  </div>
</template>

<script>
// @ is an alias to /srс
import Loading from '@/views/Loading.vue'
import Header from '@/components/Header.vue'
import TheButton from '@/components/TheButton.vue'

export default {
    name: 'signin',
    data() {
        return {
            login: '',
            password: '',
            loading: false
        }
    },
    methods: {
        submit() {
            this.loading = true
            setTimeout(() => this.loading = false, 2000)
        },
        fetchData() {

        }
    },
    components: {
        Header,
        TheButton,
        Loading
    }
}
</script>

<style lang="sass">
.cards
    display: flex
    align-items: center
    justify-content: center
    height: calc(100vh - 60px)

.card
    display: flex
    flex-direction: column
    align-items: center
    justify-content: space-between
    box-sizing: content-box
    width: 350px
    height: 250px
    background: white
    border-radius: 8px
    border: 1px solid #E0E0E0
    div
        padding-left: 40px
        padding-right: 40px

    .card-header
        font-family: 'ProximaNova-Semibold', sans-serif
        font-size: 36px
        padding: 20px 0

    .card-body
        display: flex
        flex-direction: column
        align-items: center
        justify-content: center
        height: 50%
        width: 80%
        input
            margin-bottom: 30px
            &:last-of-type
                margin-bottom: 0

    .card-footer
        padding: 20px 0


@media (max-width: 370px)
    .card
        width: 90%
</style>
