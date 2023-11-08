const express = require('express');     //라이브러리 첨부
const fetch = require('node-fetch');    //라이브러리 첨부
const app = express();                  //객체 생성
const lat = 35.88915274403333;
const lon = 128.61149004492663;
const APIkey = "61fd532fb5990bddf6d15a39a30578b1";

app.listen(8080, function(){
    console.log('listen on 8080')
});

app.get('/',function(req, res){
    res.send('반갑습니다.');
});

app.get('/home', function(req, res){
    res.send('Homepage');
});

app.get('/weather', async function(req, res){
    const data = await getData();
    res.send(JSON.stringify(data));
});

app.get('/tempcity', async function(req, res){
    const data = await getData();
    const temp = data.main["temp"] - 273.15;
    const city = data.name;
    res.send(JSON.stringify({temp, city}));
})

//Querystring
//'req.param()'은 예전에 주로 사용했음. 
//요즘에는 아래와 같이 req.query.(key)와 같이 사용함.
//example) 127.0.0.1:8080/user?name=Ryu&age=24
app.get('/user', function(req, res){
    // let u_name = req.param('name');
    // let u_age = req.param('age');
    let u_name = req.query.names;
    let u_age = req.query.age;

    res.send("User Name: " + u_name + "/ User age: " + u_age);
});

//Path
// 'req.param()'을 이용하여 파라미터를 받을 수도 있지만 'req.params'를 이용하는 것이 더욱 바람직하다.  
// 'req.params'는 json 객체로 데이터에 접근하는 key를 라우팅할 때 '/:key' 형식으로 지정이 가능하다. 
//전달하고자 하는 데이터(value)는 경로에 맞는 위치에 입력하여 요청하면 된다.
//문자열 템플릿 리터럴 할 때 키보드 '1'옆에 `(백틱)을 사용해야 ${}안에 변수를 사용할 수 있다.
//127.0.0.1:8080/user/Ryu/24
app.get('/user/:name/:age', (req, res) => {
    // let NameAge = req.params;
    // res.send("User name: " + NameAge.name + "/ User age: " + NameAge.age);

    let p_name = req.params.name;
    let p_age = req.params.age;

    res.send(`User name: ${p_name} / User age: ${p_age}`);
});


//API 사용하는 부분
//const API_URL_OpenWeatherMap = 'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}';
const API_URL_OpenWeatherMap = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`;

async function getData(){
    const response = await fetch(API_URL_OpenWeatherMap);
    if(!response.ok){
        throw new Error("Failed to fetch weather data");
    }
    const data = await response.json();
    return data;
}