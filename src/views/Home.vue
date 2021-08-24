<template>
    <div id="main">
         <p class="logo"><img src="../image/Group 2.png" alt=""></p>
        <div class="input">
            
            <img src="../image/Vector.png" alt="">
           <h1>Dump your anxiety </h1>
            <p class="description">Write down your thought below and we will publish it on<br><br>our social media to spread it globally </p>
            <div class="user-input">
                <p class="label">Your thought</p>
                <p id="word">{{thought.length}} words</p>
                <!-- <input type="text" placeholder="Your thought title" v-model="thought" /> -->
  <textarea name="message" rows="10" cols="30" placeholder="Your thought title" v-model="thought">The cat was playing in the garden.</textarea>
                <button @click="clickAddThought">Submit</button>
            </div>
            <div class="icon">
                 <a href="https://www.facebook.com/Knong-Jit-189215103175125/"  target="_blank"><img   src="../image/fb.png" alt=""></a>
                <a href="https://www.instagram.com/knong_jit/" target="_blank"><img  id="ig" src="../image/instagram.png" alt=""></a>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from "firebase";

export default {
    name: "App",
    data() {
        return {
            db: null,
            thought: ""
        };
    },
    methods: {
        addThought() {
            const dateTime = firebase.firestore.Timestamp.fromDate(new Date());
            this.db
                .collection("knongjit")
                .add({ date: dateTime, thought: this.thought })
                .then(() =>
                    this.$notify({
                        group: "noti",
                        title: "Successfully sent",
                        text: "Admin will take a look and post this",
                        type: "success"
                    })
                );
            this.thought = ""
        },
        clickAddThought() {
            if (this.thought) {
                this.addThought();
            } else {
                this.$notify({
                    group: "noti",
                    title: "Input must not be empty",
                    text:
                        "Hey there, it seems like you dont have anything to say?",
                    type: "error",
                });
            }
        },
    },
    mounted() {
        const firebaseConfig = {
            apiKey: process.env.VUE_APP_apiKey,
            authDomain: process.env.VUE_APP_authDomain,
            projectId: process.env.VUE_APP_projectId,
            storageBucket: process.env.VUE_APP_storageBucket,
            messagingSenderId: process.env.VUE_APP_messagingSenderId,
            appId: process.env.VUE_APP_appId,
        };

        const db = firebase.initializeApp(firebaseConfig).firestore();
        this.db = db;
    },
};
</script>

<style scoped>
#ig{
    position:absolute;
    right:47%
}
.icon{
position: relative;
top: 5%;
left: -4%;


}
p {
    margin: 0;
}

.logo {
    font-size: 28px;
    opacity: 1;
    margin: -20px 0 20px 0;
}

.description {
    font-size: 13px;
    font-family: "Epilogue";
    font-weight: 400;
    margin: 0 30px;
    margin-bottom: 100px;
}

.label {
    margin-bottom: 10px;
    position:relative;
    right: 17%;
    
}

.user-input {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: "Epilogue";
}
textarea{
      width: 40%;
    height: 133px;
    outline: none;
    border: none;
    font-size: 21px;
    
}
input {
    width: 40%;
    height: 133px;
    outline: none;
    border: none;
    font-size: 21px;
    
}

button {
    width: 200px;
    color: rgba(0, 0, 0, 0.8);
    background-color: white;
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

#main {
    background-color: black;
    color: white;
    margin: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
#word{
    position: absolute;
    right: 30%;
}

@media only screen and (max-width: 500px) {
    input {
        width: 90% !important;
        height:133px    ;
    }
    #word{
         right: 5%;
    }
    textarea{
        width: 90% !important;
        height:133px    ;

    }
    #ig{
    right: 40%;
    }
    .label
    {
        right: 34%;

    }
}
</style>
