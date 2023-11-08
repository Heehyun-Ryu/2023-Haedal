const express = require('express');
const fetch = require('node-fetch');

const app = express();
const serviceKey = "x%2BBVquNjuwIax13zClwIxS3CpNOqa6m4Bl9NAnYklgJ13pE0%2Blfj8ZUPd1QHhimGQ%2B1LEcuXnM7C2trbecrCJw%3D%3D";
const pageNo = 1;
const numOfRows = 10;
const type = "json";
const lat = 35.88734719326586;
const lon = 128.6127407851616;
const radius = 1;

app.listen(8080, () => {
    console.log('listen on 8080');
});

// UTF-8 설정 \n으로 개행이 안되는 경우 발생ㅠㅠ
// app.use(express.json({ limit: '50mb', extended: true }));
// app.use(express.urlencoded({ limit: '50mb', extended: true }));
// app.use((req, res, next) => {
//   res.header('Content-Type','text/html; charset=utf-8');
//   next();
// });

app.get('/', (req, res) => {
    res.send('반갑습니다.');
})

app.get('/park', async(req, res) => {
    const data = await getData();
    res.send(JSON.stringify(data));
});

app.get('/parkdetail', async(req, res) => {
    const data = await getData();

    const send_data = new Array();
    
    for(const i of data.body.items.item){
        console.log(i["parkNm"]);
        send_data.push(i["parkNm"]);
    }

    // send_data.forEach(send_data => {
    //     res.write(`park: ${send_data}\n`);
    // });

    // res.end();

    const formattedData = send_data.map(data => `park: ${data}`).join(' / ');
    res.send(formattedData);
});

const API_URL_dgInParkwalk = `https://apis.data.go.kr/6270000/dgInParkwalk/getDgWalkParkList?serviceKey=${serviceKey}&pageNo=${pageNo}&numOfRows=${numOfRows}&type=${type}&lat=${lat}&lot=${lon}&radius=${radius}`;

async function getData(){
    const response = await fetch(API_URL_dgInParkwalk);
    if(!response.ok){
        throw new Error("Failed to fetch DgWalkPark");
    }
    const data = await response.json();
    return data;
}