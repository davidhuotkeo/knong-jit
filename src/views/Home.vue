<template>
    <div id="main">
        <div class="input">
            <p class="logo">Knong Jit</p>
            <div class="user-input">
                <input type="text" ref="thought" />
                <button @click="clickAddThought">Add your inner thought</button>
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
        };
    },
    methods: {
        addThought(thoughtInput) {
            const dateTime = firebase.firestore.Timestamp.fromDate(new Date());
            this.db
                .collection("knongjit")
                .add({ date: dateTime, thought: thoughtInput })
                .then(() =>
                    this.$notify({
                        group: "noti",
                        title: "Successfully sent",
                        text: "Admin will take a look and post this",
                        type: "success"
                    })
                );
        },
        clickAddThought() {
            const thoughtInput = this.$refs.thought.value;
            if (thoughtInput) {
                this.addThought(thoughtInput);
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
p {
    margin: 0;
}

.logo {
    font-size: 24px;
    font-weight: bold;
    opacity: 0.7;
    margin-bottom: 100px;
}

.user-input {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: "Epilogue";
}

input {
    width: 40%;
    height: 40px;
    outline: none;
    border: none;
    text-align: center;
    font-size: 21px;
    border-radius: 5px;
}

button {
    width: 200px;
    color: black;
    background-color: white;
    padding: 10px 20px;
    border: none;
    margin-top: 20px;
    cursor: pointer;
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

@media only screen and (max-width: 500px) {
    input {
        width: 90% !important;
    }
}
</style>
