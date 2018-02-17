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
        transform: scale(1)
    50%
        transform: scale(1.1)
    to
        transform: scale(1)
img
    animation: breathing 2s infinite linear 0
</style>