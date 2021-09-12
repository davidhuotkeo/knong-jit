<script>
export default {
    data(){
       return{
           username:'',
           password:'',
       }
    },
    created()
    {
            if(localStorage.login==1){
                 this.$router.push('/Admin')

            }
    },
    methods:{
        verifyLogin(){
            if(this.username==process.env.VUE_APP_USERNAME && this.password==process.env.VUE_APP_PASSWORD){
                localStorage.login=1
                this.$router.push('/Admin')
            }
            else{
                this.$notify({
                    group: "noti",
                    title: "Error ",
                    text: "Wrong Password or Username",
                    type: "error",
                    });
            }
        }
    }
}
</script>
<template>
    <div id="main">
        <div class="shadow-Box">

            <div class="image-logo">
            <img
                id="logo"
                src="../assets/knong-jit-logo.svg"
                alt="knong jit logo"
            />            
            </div>

            <div class="image-illustration">
                 <img
                    id="anxiety-image"
                    src="@/assets/anxiety-illustration.svg"
                    alt="Line anxiety image"
                />
            </div>
            
            <div class="user-input">
                
                <label>Username</label>
                <input  type="text"  v-model="username" placeholder="Enter username" ><br><br>
                <label>Password</label>
                <input  type="password" v-model="password" placeholder="Enter password">
            
            </div>

            <button @click="verifyLogin()">Login</button>
        </div>
    </div>
</template>
<style scoped>
#main {
    color: white;
    margin: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
}
.shadow-Box{
    background-color: black;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.9);
    transition: 0.3s;
    width: 400px;
    height: 500px;
    margin-top:auto ;
    margin-bottom: auto;
}

.user-input{
    align-items: center;
    margin-top:8px ;
    justify-content: space-around;
        
}
input {
    height: 30px;
    width: 80%;
}
button {
    width: 30%;
    height: 10%;
    color: rgba(0, 0, 0, 0.8);
    background-color: white;
    padding: 1px 10px;
    border: none;
    margin-top: 25px;
    cursor: pointer;
}
button:hover {
    background-color: #CFD0D1;
}
#logo {
    width: 200px;
    margin-top: 32px;
}
#anxiety-image{
    position: relative;
    width: 40%;
    margin: 32px;
}
label{
position: relative;
 right:  31%;
 bottom: 5px;
 text-align: left;
 
}
</style>