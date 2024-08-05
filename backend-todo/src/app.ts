import express from 'express'

const app = express();
const mysql = require('mysql');

app.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'test_db',
});

connection.connect((err: Error) => {
    if (err) throw err;
    console.log('Connected');

    // tasks取得
    app.get("/api/tasks", (req, res) => {
        const sql: string = "select * from tasks";
        connection.query(sql, (err: Error, result: any) => {
            if (err) throw err;
            res.send(result);
        });
    });

    // task作成
    app.post("/api/tasks", (req, res) => {
        const new_task: string = req.body.task;
        const sql: string = `insert into tasks (task) values ('${new_task}')`;
        connection.query(sql, (err: Error, result: any) => {
            if (err) throw err;
            res.send(result);
        });
    });

    // task更新

    // task削除
    app.delete("/api/tasks/:id", (req, res) => {
        const id: number = Number(req.params.id);
        const sql: string = `delete from tasks where id='${id}'`;
        connection.query(sql, (err: Error, result: any) => {
            if (err) throw err;
            res.send(result);
        })
    }); 
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});