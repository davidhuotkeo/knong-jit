<template>
    <div class="about">
        <grid :cols="col" :rows="row" />
    </div>
</template>

<script>
import firebase from "firebase";
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
            this.db
                .collection("knongjit")
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
                        console.log(this.row);
                    });
                });
        },
    },
    mounted() {
        const firebaseConfig = {
            apiKey: process.envapiKey,
            authDomain: process.envauthDomain,
            projectId: process.envprojectId,
            storageBucket: process.envstorageBucket,
            messagingSenderId: process.envmessagingSenderId,
            appId: process.envappId,
        };

        const db = firebase.initializeApp(firebaseConfig).firestore();
        this.db = db;

        this.readThought();
    },
};
</script>

<style scoped>
</style>