import express from 'express'

const app = express();
const mysql = require('mysql');
const cors = require("cors");

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);

app.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'test_db',
    multipleStatements: true,
});

connection.connect((err: Error) => {
    if (err) throw err;
    console.log('Connected');

    // idを連番に修正
    const idReset = () => {
        const set_sql = "set @n:=0; ";
        const update_sql = "update tasks set id=@n:=@n+1"; 
        connection.query(set_sql + update_sql, (err: Error) => {
            if (err) throw err;
        });
    }

    // tasks取得
    app.get("/api/tasks", (req, res) => {
        const sql: string = "select * from tasks";
        connection.query(sql, (err: Error, result: []) => {
            if (err) throw err;
            res.send(result);
        });
    });

    // task作成
    app.post("/api/tasks", (req: express.Request, res: express.Response) => {
        const new_task: string = req.body.task._value;
        const deadline: string = req.body.deadline._value;
        // console.log(new_task);
        const sql: string = `insert into tasks (task, deadline, status, delete_task) values ('${new_task}', '${deadline}', false, false)`;
        connection.query(sql, (err: Error, result: []) => {
            if (err) throw err;
            res.send(result);
        });
        idReset();
    });

    // task status更新
    app.put("/api/tasks/:id", (req, res) => {
        const id: number = Number(req.params.id);
        const sql: string = `update tasks set status=true where id='${id}'`;
        connection.query(sql, (err: Error, result: []) => {
            if (err) throw err;
        })
    })

    // task削除
    app.delete("/api/tasks/:id", (req, res) => {
        const id: number = Number(req.params.id);
        const sql: string = `delete from tasks where id='${id}'`;
        connection.query(sql, (err: Error, result: []) => {
            if (err) throw err;
            res.send(result);
        })
        idReset();
    }); 
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});