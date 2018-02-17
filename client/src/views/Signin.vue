<template>
  <div class="home">
    <Header/>
  </div>
</template>

<script>
// @ is an alias to /sr
import Preloader from '@/components/Preloader.vue'
import Header from '@/components/Header.vue'

export default {
    name: 'signin',
    components: {
        Preloader,
        Header
    }
}
</script>
