<template>
    <div class="main">
        <Preloader/>
    </div>
</template>

<script>
// @ is an alias to /src
import Preloader from '@/components/Preloader.vue'

export default {
    name: 'Loading',
    components: {
        Preloader
    }
}
</script>

<style lang="sass" scoped>
.main
    display: flex
    align-items: center
    justify-content: center
    height: 100vh
</style>
