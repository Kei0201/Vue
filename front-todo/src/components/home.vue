<script setup lang="ts">
    import axios from 'axios';
    import { ref, onMounted } from 'vue';
    import Modal from './Modal.vue';

    const text = ref('');
    const deadline = ref();
    const tasks = ref();
    const status = ref();
    const showContent = ref(false);

    const openModal = () => {
        console.log('click');
        showContent.value = true;
    };

    const closeModal = () => {
        showContent.value = false;
    };
    

    const getTasks = async () => {
        await axios.get("http://localhost:3000/api/tasks")
            .then(res => {
                tasks.value = res.data;
            }).catch(err => {
                console.log(err);
            })
    }
    onMounted(async() => {
        await getTasks();
    });

    // const postTask = async () => {
    //     // console.log(text);
    //     await axios.post("http://localhost:3000/api/tasks", {task: text, deadline: deadline})
    //         .then(res => {
    //             tasks.value = res.data;
    //         }).catch(err => {
    //             console.log(err);
    //         });
    //         // await getTasks();
    // }

    // const task = {
    //     task: text,
    //     deadline: deadline,
    // }
    const postTask = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify({
                    task: text,
                    deadline: deadline,
                })
            });
            const data = await res.json();
            tasks.value = data[1];
        } catch (error) {
            console.log(error);
        }
    }

    // const updateTaskStatus = async (id: number) => {
    //     await axios.put(`http://localhost:3000/api/tasks/${id}`)
    //         .then(res => {
    //             tasks.value = res.data;
    //         }).catch(err => {
    //             console.log(err);
    //         });
    //         // await getTasks();
    // } 
    const updateTaskStatus = async (id: number) => {
        try {
            const res = await fetch(`http://localhost:3000/api/tasks/${id}`, {
                method: 'PUT',
            });
            const data = await res.json();
            tasks.value = data[1];
            // console.log(data[])
        } catch (error) {
            console.log(error);
        }
    }

    // const deleteTask = async (id: number) => {
    //     await axios.delete(`http://localhost:3000/api/tasks/${id}`)
    //         .then(res => {
    //             tasks.value = res.data;
    //         }).catch(err => {
    //             console.log(err);
    //         });
    //         // await getTasks();
    // }
    const deleteTask = async (id: number) => {
        try {
            const res = await fetch(`http://localhost:3000/api/tasks/${id}`, {
                method: 'DELETE'
            });
            const data = await res.json();
            tasks.value = data[1];
            console.log(data[1]);
        } catch (error) {
            console.log(error);
        }
    }
</script>

<template>
    <h1>todoリスト</h1>
    <input v-model="text" type="text" placeholder="やるべきこと">
    <input v-model="deadline" type="date" name="deadline">
    <input type="submit" value="追加" @click="postTask" key="postTasks">
    <!-- <input type="submit" value="削除" @click=""> -->
    <div v-for="(task, index) in tasks" :key="index">
        <!-- <div id=""></div> -->
        {{ task.id }} : {{ task.task }} {{ task.deadline }} 
        <p v-if='!task.status'>未処理</p>
        <p v-else>処理済</p>
        <input type="submit" value="削除" @click="deleteTask(task.id)">
        <!-- <input type="submit" value="削除" @click="openModal"> -->
        <Modal v-show="showContent" @click="closeModal"/>
        <input type="submit" value="編集する" >
        <input type="submit" value="処理済にする" @click="updateTaskStatus(task.id)">
    </div>
    <!-- {{ deadline }} -->
</template>

<style scoped>
    

</style>

<!-- 実装予定機能 -->
<!-- タスク（内容、期限、ステータス）右側に処理済 編集 削除
表示切替（全て、未処理、処理済み）
フィルター（カテゴリー）
並び替え（日付） -->