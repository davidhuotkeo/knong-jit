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
    }
};
</script>

<style scoped>
.preview {
    color: white;
    width: 1080px;
    height: 1080px;
}

.data {
    position: absolute;
    top: 0;
    width: 1080px;
    display: grid;
    height: 1080px;
    grid-template-rows: 300px auto;
}

.id {
    justify-self: flex-end;
    margin: 110px;
    font-size: 30px;
}

.title {
    justify-self: start;
    text-align: start;
    display: grid;
    align-content: end;
    margin: 0 110px 110px 110px;
    font-size: 80px;
    font-weight: bolder;
}

.title > span {
    text-align: start;
    line-height: 110px;
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
