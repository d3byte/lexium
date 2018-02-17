<template>
    <img src="@/assets/logo-notext.png">
</template>

<script>
export default {
    name: 'Preloader',
}
</script>

<style lang="sass" scoped>
@keyframes breathing
    from
        transform: scale(0.6)
    50%
        transform: scale(0.7)
    to
        transform: scale(0.6)
img
    animation: breathing 2s infinite ease-in-out 0
</style>