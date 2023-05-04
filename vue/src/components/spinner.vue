<template>
    <div class="spinner" :style="mystyle"></div>
</template>

<script>
    export default {
        name: "spinner",
        props: ["width"],
        computed: {
            mystyle: function () {
                return {
                    width: `${this.width}px`,
                    height: `${this.width}px`,
                }
            }
        }
    }
</script>

<style scoped>

    .spinner {
        display: inline-block;
        border: 3px solid rgba(255, 255, 255, .3);
        border-radius: 50%;
        border-top-color: #fff;
        animation: spin 1s ease-in-out infinite;
        /*animation: spin 1s linear infinite;*/
        -webkit-animation: spin 1s ease-in-out infinite;
    }

    @keyframes spin {
        to {
            -webkit-transform: rotate(360deg);
        }
    }

    @-webkit-keyframes spin {
        to {
            -webkit-transform: rotate(360deg);
        }
    }

</style>
