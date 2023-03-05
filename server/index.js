const express = require("express");
const app = express();
const mysql2 = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const db = mysql2.createPool({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "banco",
});

app.use(express.json());
app.use(cors());


app.post('/register', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query("select * from usuarios where email = ?", [email],
        (err, response) => {
            if (err) {
                res.send(err);
            }
            if (response.length == 0) {
                bcrypt.hash(password, saltRounds, (err, hash) => {
                    db.query("insert into usuarios (email, password) values (?, ?)", [email, hash], (err, response) => {
                        if (err) {
                            res.send(err)
                        }
                        res.send({ msg: "Cadastrado com sucesso." })
                    });
                })
            } else {
                res.send({ msg: "Este e-mail ja está sendo utilizado." })
            }

        });
})

app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;


    db.query("select * from usuarios where email = ? ", [email], (err, result) => {
        if (err) {
            res.send(err);
        }
        if (result.length > 0) {
            bcrypt.compare(password, result[0].password,
                (erro, result) => {
                    if (result) {
                        res.send({ msg: "Usuário logado com sucesso" })
                    } else {
                        res.send({ msg: "A senha está incorreta" })
                    }
                });
        } else {
            res.send({ msg: "Email não encontrado" })
        }
    });

});

app.listen(3001, () => {
    console.log("Rodando na porta 3001")
});