<template>
    <div id="main">
        <div class="input">
            <img
                id="logo"
                src="@/assets/knong-jit-logo.svg"
                alt="knong jit logo"
            />
            <div class="content">
                <img
                    id="anxiety-image"
                    src="@/assets/anxiety-illustration.svg"
                    alt="Line anxiety image"
                />
                <p class="knong-jit-title">Dump your anxiety</p>
                <p class="description">
                    Write down your thought below and we will publish it on our
                    social media to spread it globally
                </p>
            </div>
            <div class="user-input">
                <div class="input-items">
                    <p class="label">Your thought</p>
                    <p id="word">{{ thought.length }} words</p>
                </div>
                <!-- <input type="text" placeholder="Your thought title" v-model="thought" /> -->
                <textarea
                    name="message"
                    rows="10"
                    cols="30"
                    placeholder="Your thought title"
                    v-model="thought"
                >
The cat was playing in the garden.</textarea
                >
                <button @click="clickAddThought">Submit</button>
            </div>
        </div>
        <div class="icon">
            <a
                href="https://www.facebook.com/Knong-Jit-189215103175125/"
                target="_blank"
                ><img src="../image/fb.png" alt=""
            /></a>
            <a href="https://www.instagram.com/knong_jit/" target="_blank"
                ><img id="ig" src="../image/instagram.png" alt=""
            /></a>
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
            thought: "",
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
                        type: "success",
                    })
                );
            this.thought = "";
        },
        clickAddThought() {
            if (this.thought) {
                this.addThought();
            } else {
                this.$notify({
                    group: "noti",
                    title: "Input must not be empty",
                    text: "Hey there, it seems like you dont have anything to say?",
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

.input {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    justify-content: space-around;
}

#logo {
    width: 200px;
}

p {
    margin: 0;
}

#anxiety-image {
    width: 250px;
}

.knong-jit-title {
    font-size: 32px;
    font-weight: bolder;
    margin: 32px 0 8px 0;
}

.description {
    font-size: 16px;
    font-weight: 500;
    line-height: 19px;
    max-width: 50vw;
}

.input-items {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 8px;
}

.user-input {
    display: flex;
    flex-direction: column;
    align-items: center;
}

textarea {
    height: 133px;
    width: 60vw;
    padding: 16px;
    outline: none;
    border: none;
    font-size: 16px;
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
    background-color: #CFD0D1;
}

.icon {
    margin-bottom: 60px;
}

.icon > *:first-child {
    margin-right: 20px;
}

@media only screen and (min-width: 1000px) {
    .description {
        width: 30vw;
    }

    textarea {
        max-width: 50vw;
    }
}

@media only screen and (max-width: 500px) {
    p {
        font-size: 14px;
    }

    .knong-jit-title {
        font-size: 24px;
    }

    #logo {
        width: 150px;
    }

    #anxiety-image {
        width: 175px;
    }

    #word {
        right: 5%;
    }

    .description {
        max-width: 90vw;
        font-size: 14px;
    }

    textarea {
        width: calc(90vw - 32px);
        height: 90px;
    }

    .icon {
        margin-bottom: 20px;
    }
}
</style>
