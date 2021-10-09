<template>
    <div>
        <div>
            <div class="preview" id="preview">
                <img src="@/assets/knong_jit_poster.png" alt="poster" />
                <div class="data">
                    <span class="id">{{ id ? id : "This is id" }}</span>
                    <span class="title"><div>{{ title ? title : "Sample Title Here" }}</div></span>
                </div>
            </div>
            <div class="input-data">
                <input v-model="id" type="text" />
                <input v-model="title" type="text" />
                <button @click="generateImage">Generate Poster</button>
            </div>
        </div>
        <div id="result"></div>
    </div>
</template>

<script>
import html2canvas from "html2canvas";

export default {
    data() {
        return {
            id: "",
            title: "",
        };
    },
    methods: {
        generateImage() {
            const targetDiv = document.getElementById("preview");
            const result = document.getElementById("result");
            html2canvas(targetDiv).then(canvas => {
                if (result.firstChild) result.removeChild(result.firstChild)
                result.appendChild(canvas)
            })
        }
    },
       created()
    {
            if(localStorage.login!=1){
                 this.$router.push('/AdminLogin')

            }
    },
};
</script>

<style scoped>
.preview {
    color: white;
    width: 1024px;
    height: 1024px;
}

.data {
    position: absolute;
    bottom: 10px;
    text-align: start;
    margin-left: 120px;
}

.id {
    font-size: 42px;
    opacity: 0.8;
}

.title > div {
    line-height: 100px;
    font-size: 85px;
    max-width: 784px;
    margin-top: 38px;
    font-weight: bolder;
}

.input-data {
    display: flex;
    flex-direction: column;
    width: 90vw;
    margin: 20px 0 0 20px;
}

.input-data > * {
    margin-bottom: 20px;
}

input, button {
    height: 50px;
    border: none;
}

input {
    background-color: whitesmoke;
}

</style>
