<template>
    <div id="main">
        <div class="input">
            <p class="logo">Knong Jit</p>
            <p class="description">People have many things in our mind, but sometimes cannot speak out. Knong jit will read and publish your inner thought.</p>
            <div class="user-input">
                <p class="label">Something in your mind (50 letters max)</p>
                <input type="text" ref="thought" maxlength="50" />
                <button @click="clickAddThought">Add Thought</button>
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
    opacity: 0.7;
    margin: 0 0 20px 0;
}

.description {
    margin: 0 30px;
    margin-bottom: 100px;
}

.label {
    margin-bottom: 10px;
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
    border-radius: 8px;
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
    border-radius: 8px;
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
