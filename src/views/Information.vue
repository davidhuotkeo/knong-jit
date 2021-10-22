<template>
    <div class="about">
        <div v-for="datas in row" :key="datas.id">
            <BoxSubmission :title=datas.title :content=datas.thought 
            :date=datas.date :number=datas.number :star=datas.star 
            :id=datas.id     @update-to-db="changeValue"  />
        </div>
    </div>
    
</template>

<script>
import BoxSubmission from '../components/BoxSubmission'
import firebase from 'firebase/app';
import 'firebase/firestore';

export default {
    data() {
        return {
            db: null,
            col: ["date", "Title","Thought"],
            row: [],
            value1:null
        };
    },
    components: {
        BoxSubmission,
    },
    methods: {
         changeValue(star,id){
          this.db
            .collection('knongjit')
            .doc(id)
            .update({
                star: star,
                })
            .then(() => {
                console.log('Doc updated')
                })
            .catch((error) => {
                console.log(error)
                })
    },
         convertLine(value){
            return value.replaceAll("[newLine*]", "/n");
        },
        timeFormat(seconds, nanoseconds) {
            const date = new firebase.firestore.Timestamp(
                seconds,
                nanoseconds
            )
                .toDate()
            return `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
        },
        readThought() {
            const currentEnv = process.env.VUE_APP_environment;
            let collectionName = "knongjit"
            if (currentEnv == "development") {
                collectionName = "knongjitDevelopment"
            }
            this.db
                .collection(collectionName)
                .orderBy("date", "desc")
                .get()
                .then((querySnapshot) => {
                    const tempDoc = querySnapshot.docs.map((doc) => {
                        return { id: doc.id, ...doc.data() };
                    });
                    let countSubmission = tempDoc.length;
                    tempDoc.forEach((element) => {
                        let data = {
                            date: this.timeFormat(element.date.seconds, element.date.nanoseconds),
                            title: element.title,
                            thought: this.convertLine(element.thought),
                            star:element.star,
                            number: countSubmission,
                            id:element.id
                        };
                        countSubmission--;
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
.about{
    line-height: 24px;
    margin-top: 3%;
    display: grid;
    justify-content: center;
}
.boxOfTotal{
    background-color: #f9fafb;
    box-shadow: 0 1px 4px 0 rgba(231, 131, 131, 0.9);
    transition: 0.3s;
     width: 200px;
     margin-left: auto;
     margin-right: auto;
}

.boxOfTotal > span{
    color: blue;
}

</style>