<script>
export default {
    data(){
        return{

        }
    },created(){
         if(localStorage.login!=1){
                 this.$router.push('/AdminLogin')

            }
    }
}
</script>
<template>
    <div>
        <button @click="$router.push('/Information')">Information</button>
        <button @click="$router.push('/Generate')">Generate</button>

    </div>
</template>
<style scoped>
button {
    width: 200px;
    color: rgba(0, 0, 0, 0.8);
    background-color:wheat;
    padding: 12px 15px;
    border: none;
    margin-top: 20px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
}

button:hover {
    background-color: whitesmoke;
}
</style>