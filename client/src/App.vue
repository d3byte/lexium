<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
    components: {
        Header,
    }
}

</script>

<style lang="sass">
input.line-based
    font-family: 'ProximaNova-Regular', sans-serif
    font-size: 16px
    border: none
    border-bottom: 1px solid #979797
    padding-left: 10px
    width: 100%
    transition: 0.2s
    color: #595959
    &::-webkit-input-placeholder
        color: #D4D4D4
    &:-moz-placeholder
        color: #D4D4D4
    &::-moz-placeholder
        color: #D4D4D4
    &:-ms-input-placeholder
        color: #D4D4D4
    &:focus
        outline: none
        border-color: #626262
        &:-webkit-input-placeholder
            color: #9D9C9C
        &:-moz-placeholder
            color: #9D9C9C
        &:-moz-placeholder
            color: #9D9C9C
        &:-ms-input-placeholder
            color: #9D9C9C
        
</style>
