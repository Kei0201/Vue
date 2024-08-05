<script setup lang="ts">
    import axios from 'axios';
    import { ref, onMounted } from 'vue';

    const text = ref('');
    const tasks = ref();

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
    })

    const postTasks = async () => {
        // console.log(text);
        await axios.post("http://localhost:3000/api/tasks", {task: text}
        ).then(res => {
            tasks.value = res.data;
        }).catch(err => {
            console.log(err);
        })
        await getTasks();
    }

    const deleteTasks = async () => {
        await axios.delete("http://localhost:3000/api")
    }
</script>

<template>
    <h1>todoリスト</h1>
    <input v-model="text" type="text" placeholder="やるべきこと">
    <input type="submit" value="追加" @click="postTasks">
    <div v-for="(task, index) in tasks">
        {{ index+1 }} : {{ task.task }}
    </div>
    <p>{{ text }}</p>
</template>
