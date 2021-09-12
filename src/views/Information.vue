<template>
    <div class="about">
        <grid :cols="col" :rows="row" />
        
    </div>
    
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/firestore';
import Grid from "gridjs-vue";

export default {
    data() {
        return {
            db: null,
            col: ["date", "thought"],
            row: [],
        };
    },
    components: {
        Grid,
    },
    methods: {
        timeFormat(seconds, nanoseconds) {
            const date = new firebase.firestore.Timestamp(
                seconds,
                nanoseconds
            )
                .toDate()
            return `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
        },
        readThought() {
            const now = new Date();
            const last2Day = new Date(now.setDate(now.getDate() - 7));

            this.db
                .collection("knongjit")
                .orderBy("date", "desc")
                .where("date", ">=", last2Day)
                .get()
                .then((querySnapshot) => {
                    const tempDoc = querySnapshot.docs.map((doc) => {
                        return { id: doc.id, ...doc.data() };
                    });
                    tempDoc.forEach((element) => {
                        let data = [];
                        data.push(this.timeFormat(element.date.seconds, element.date.nanoseconds));
                        data.push(element.thought);

                        this.row.push(data);
                    });
                });
        },
    },
    created()
    {
            if(localStorage.login!=1){
                 this.$router.push('/AdminLogin')

            }
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

        this.readThought();
    },
};
</script>

<style scoped>
</style>