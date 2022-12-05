const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const mysql = require('mysql');

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'1234',
    database:'proj'
});

app.use(express.json()); // 클라이언트에서 보낸 데이터를 json으로 파싱하여 req.body에 데이터를 넣어주는 역할
app.use(express.urlencoded({ extended : true })); // form에서submit할 때 form 파싱하는 역할
// var cors = require('cors'); // cors 에러 방지
// app.use(cors());

connection.connect((err) => {
    if (err) {
        console.log('error connecting: ' + err.stack);
        return;
    }
    console.log('DB connect success.');
});

app.get('/', (req, res) => {
    res.send('DB 연동 성공 !');
})

app.listen(PORT, ()=> {
    console.log('Server run : http://localhost:${PORT}/');
})