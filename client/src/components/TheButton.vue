<template>
    <button :class="className" @click="clickHandler">
        {{ text }}
    </button>
</template>

<script>
export default {
    name: 'TheButton',
    props: ['clickHandler', 'className', 'text']
}
</script>

<style lang="sass" scoped>
button
    padding: 5px 0
    border-radius: 8px
    min-width: 200px
    border: 1px solid #979797
    transition: 0.2s
    &:hover
        cursor: pointer

.authorization
    background: #8A8CE6
    padding: 7px 0
    color: white
    font-size: 18px
    font-family: 'ProximaNova-Regular', sans-serif
    &:hover
        background: #6F72E3
    &:active
        background: #5F61B2

.regular
    background: #6B6DB8
    padding: 5px 0
    color: white
    font-size: 14px
    font-family: 'ProximaNova-Regular', sans-serif
    text-transform: uppercase
    &:hover
        background: #8686DA
    &:active
        background: #5959A5
        
    &.fluid
        min-width: 100%
        
    &.lighter
        background: #8A8CE6
    &.lighter:hover
        background: #6F72E3
    &.lighter:active
        background: #5F61B2

</style>