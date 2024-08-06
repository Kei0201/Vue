<script setup>
    const emit = defineEmits(['closeModal']);

    const stopEvent = (e) => {
        e.stopPropagation();
    }
    
    const test = () => {
        console.log("aaa");
    }
</script>

<template>
    <div id="overlay">
        <div id="content" @click="stopEvent">
            <p>これがモーダルウィンドウです。</p>
            <p><button @click="emit('closeModal')">close</button></p>
            <button @click="test">テスト</button>
        </div>
    </div>
</template>

<style scoped>
    #overlay {
        /* 要素を重ねたときの順番 */
        z-index: 1;

        /* 画面全体を覆う設定 */
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color:rgba(66, 64, 64, 0.411);

        /* 画面の中央に要素を表示させる設定 */
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    #content {
        z-index: 2;
        width: 50%;
        padding: 1em;
        background: #fff;
    }

</style>