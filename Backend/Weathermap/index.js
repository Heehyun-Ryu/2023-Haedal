const express = require('express')      //라이브러리 첨부
const app = express();                  //객체 만드는 건데 몰라도 됨

app.listen(8080,function(){
	console.log('listening on 8080')
});

//누군가가 /pet 으로 방문을 하면..
//pet관련된 안내문을 띄워주자

app.get('/',function(요청,응답){
	응답.send('반갑습니다');
});