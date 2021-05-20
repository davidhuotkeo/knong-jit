<template>
    <div id="app">
        <router-view></router-view>
        <notifications group="noti" />
    </div>
</template>

<script>
export default {
    name: "App",
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Epilogue&display=swap');

#app {
    font-family: 'Epilogue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
}

body {
    margin: 0;
}
</style>
