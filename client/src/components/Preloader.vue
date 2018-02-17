<template>
    <img class="preloader" src="@/assets/logo-notext.png">
</template>

<script>
export default {
    name: 'Preloader',
}
</script>

<style lang="scss" scoped>
@-webkit-keyframes breathing {
    0% {
        -webkit-transform: scale(0.6, 0.6);
    }

    50% {
        -webkit-transform: scale(0.7, 0.7);
    }

    100% {
        -webkit-transform: scale(0.6, 0.6);
    }
}
@-moz-keyframes breathing {
    0% {
        -moz-transform: scale(0.6, 0.6);
    }

    50% {
        -moz-transform: scale(0.7, 0.7);
    }

    100% {
        -moz-transform: scale(0.6, 0.6);
    }
}
@-o-keyframes breathing {
    0% {
        -o-transform: scale(0.6, 0.6);
    }

    50% {
        -o-transform: scale(0.7, 0.7);
    }

    100% {
        -o-transform: scale(0.6, 0.6);
    }
}
@keyframes breathing {
    0% {
        transform: scale(0.6, 0.6);
    }

    50% {
        transform: scale(0.7, 0.7);
    }

    100% {
        transform: scale(0.6, 0.6);
    }
}

img.preloader {
    transform: scale(0.6);
    -webkit-transform: scale(0.6);
    -ms-transform: scale(0.6);
    -webkit-animation: breathing 2s infinite ease-in-out;
    -moz-animation: breathing 2s infinite ease-in-out;
    -o-animation: breathing 2s infinite ease-in-out;
    animation: breathing 2s infinite ease-in-out;
}
</style>