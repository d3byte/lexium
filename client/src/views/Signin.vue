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
</style>
