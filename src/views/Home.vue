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
                <p class="knong-jit-title">Free your mind</p>
                <p class="description">
                    Bottling up emotions and thoughts aren’t always easy. Maybe in the end, we all walk down the same paths?
                </p>
            </div>
            <div class="user-input">
                <div>
                    <p class="title-style">Your title</p>
                     <input type="text" placeholder="Let us know..." v-model="title" />
                </div>
                <div class="input-items">
                    <p class="label">Your story</p>
                    <p id="word">{{ thought.split(" ").length }} words</p>
                </div>
               
                <textarea
                    name="message"
                    rows="10"
                    cols="30"
                    placeholder="Let us know..."
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
import firebase from 'firebase/app';
import 'firebase/firestore';

export default {
    name: "App",
    data() {
        return {
            db: null,
            thought: "",
            title:"",
        };
    },
    
    methods: {
        addThought() {
            const currentEnv = process.env.VUE_APP_environment;
            let collectionName = "knongjit"
            if (currentEnv == "development") {
                collectionName = "knongjitDevelopment"
            }
            const dateTime = firebase.firestore.Timestamp.fromDate(new Date());
            this.db
                .collection(collectionName)
                .add({ date: dateTime, title:this.title,thought: this.thought })
                .then(() =>
                    this.$notify({
                        group: "noti",
                        title: "Successfully sent",
                        text: "Admin will take a look and post this",
                        type: "success",
                    })
                );
            this.thought = "";
            this.title="";
        },
        clickAddThought() {
            if (this.thought &&this.title) {
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
.title-style{
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 8px;
    margin-top: 15px;
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

.input {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    justify-content: space-around;
}

#logo {
    width: 200px;
    margin-top: 20px;
}

p {
    margin: 0;
}
input {
    /* margin-top: 5%; */
       height: 25px;
    width: 50vw;
    padding: 16px;
    outline: none;
    border: none;
    font-size: 16px;
    
}
#anxiety-image {
    width: 170px;
}

.knong-jit-title {
    font-size: 32px;
    font-weight: bolder;
    margin: 32px 0 8px 0;
}

.description {
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    max-width: 50vw;
}

.input-items {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 8px;
    margin-top: 15px;
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
    margin: 10px 0;
}


.icon > *:first-child {
    margin-right: 20px;
}

@media only screen and (min-width: 1000px) {
    .description {
        width: 40vw;
    }

    textarea {
        max-width: 50vw;
    }
    input{
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
     input {
        width: calc(90vw - 32px);
    }

    .icon {
        margin-bottom: 20px;
    }
}
</style>
