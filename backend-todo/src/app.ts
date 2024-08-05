import express from 'express'
// import { databaseInit } from './database'
// // import mysql from 'mysql'
// // import mysql from 'mysql2'


// const app = express();
// const mysql = require('mysql');
// // app.use(express.json());

// // databaseInit().then(() => {
// //     console.log("Database connected.");
// // }).catch(error => {
// //     console.error("Database connection failed:", error);
// // });

// // app.get('/', (req, res) => {
// //     res.send("Hello World!");
// // });

// app.use(express.static('public'));

// const connection = mysql.createConnection({
//     host: 'localhost',
//     port: 3306,
//     user: 'root',
//     password: '',
//     database: 'test_db',
// });

// connection.connect((err: Error) => {
//     if (err) throw err;
//     console.log('Connected');
//     const sql: string = "select * from user";
//     connection.query(sql, (err: Error, result: any) => {
//         if (err) throw err;
//         console.log(result);
//     });
// });

// app.listen(3000, () => {
//     console.log('Server running on http://localhost:3000');
// })

const app = express();

app.use(express.json());

const users = [
    {id: 1, name: "Maeda Junya"},
    {id: 2, name: "Ito Ayase"},
    {id: 3, name: "Kubo Ritsu"},
];

app.get("/", (req, res) => {
    res.send("Hello World");
})

// read
app.get("/api/users", (req, res) => {
    // usersを返す
    res.send(users);
});

// create
app.post("/api/users", (req,res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
    };

    // usersに新たなユーザ追加
    users.push(newUser);

    // usersを返す
    res.send(users);
});

// update
app.put("/api/users/:id", (req, res) => {
    // 指定されたidを持つユーザの特定、データを保持
    const user = users.find((u) => u.id === parseInt(req.params.id));

    // idが存在しなければエラーを返す
    if (!user) return res.status(500).send("このユーザは存在しません");

    // 名前をリクエストに付与された値に変更
    user.name = req.body.name;

    // usersを返す
    res.send(users);
});

// delate 
app.delete("/api/users/:id", (req, res) => {
    // リクエストされたidを持つユーザの特定
    const user = users.find((u) => u.id === parseInt(req.params.id));

    // idが存在しなければエラーを返す
    if (!user) return res.status(500).send("このユーザは存在しません");

    // 特定したユーザがuser配列のどこにいるか調べ
    // そのindexを保持
    const index = users.indexOf(user);

    // spliceを使いindexを基にユーザ削除
    users.splice(index, 1);

    // usersを返す
    res.send(users);

})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});