const express = require('express');
const app = express();
app.get('/',(request,response,next)=>{
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', '*');
    response.header('Content-Type', 'application/json;charset=utf-8');
    response.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    response.send('hello world');// 传送HTTP响应，响应内容
    next();
});

app.listen("8083",()=>{
    console.log("8083 is listening");
})
