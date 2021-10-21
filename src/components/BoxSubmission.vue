<script>
export default {
     props: {
        title: {
             type: String,
            default: 'No title',
            },
        content:{
            type:String,
            default:'No content',
        },
        date:{
            type:String,
            default:'00-00-21',
        },
        number:{
          type:String,
          default:'0'  
        }
        

    },
    data(){
        return{

        }
    }
}
</script>
<template>
    <div class="main">
       <div class="date">
           <p>{{date}}</p>
       </div>
       <div class="title">
           <p>{{title}}</p>
       </div>
       <div class="content">
           <pre>{{content}}</pre>
       </div>
       <div class="number">
           <p>{{number}}</p>
       </div>
    </div>
</template>
<style scoped>
.main{
    margin-bottom: 20px;
    width: 90vw;
    padding: 20px;
    border-radius: 8px;
    display: grid;
    text-align: left;
    border: solid 2px black;
}

.main > div > * {
    margin: 0 0 10px 0;
}

.date{
    font-size: 14px;
}

.title{
    font-weight: bold;
    font-size: 16px;
}

.content{
    text-align: left;
    font-size: 16px;
    position: relative;
}

.number {
    text-align: right;
    color: grey;
}

pre {
  inline-size: 100%;
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>