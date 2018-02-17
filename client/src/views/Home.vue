<template>
    <div class="home">
        <TheButton :clickHandler="handler" className="authorization" text="Дальше"/>
        <TheButton :clickHandler="handler" className="regular" text="Выполнить"/>
        <div class="showcase-button">
            <TheButton :clickHandler="handler" className="regular fluid" text="Выполнить"/>
            <TheButton :clickHandler="handler" className="regular fluid" text="Улучшить результат"/>
            <TheButton :clickHandler="handler" className="regular fluid lighter" text="Улучшить результат"/>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import TheButton from '@/components/TheButton.vue'

export default {
    name: 'home',
    methods: {
        handler() {
            let random = Math.round(Math.random())
            switch (random) {
                case 0:
                    this.$router.push('/loading')
                    break
                case 1:
                    this.$router.push('/123')
                    break
            }
        }
    },
    components: {
        TheButton,
    },
}
</script>

<style lang="sass" scoped>
// Эти стили можно смело убрать
.home
  display: flex
  align-items: center
  justify-content: center

.showcase-button
  display: flex
  flex-direction: column
  background: white
  width: 300px
  padding: 10px
  height: 100px
  border: 1px solid #E0E0E0
</style>
