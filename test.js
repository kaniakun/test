const Pool = require('pg').Pool
const express=require('express')
const app=express()
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'test',
  password: 'postgres',
  port: 5433,
})

var customer=[{
  key:0,
  firstname:"igor",
  lastname:"igorich",
  orders:
  {
    title:["fizika","matematika"]
  }
},{key:1,
  firstname:"petr",
  lastname:"ivanov",
  orders:
  {
    title:["manas","ximia"]
  }
},{key:2,
  firstname:"vova",
  lastname:"volkov",
  orders:
  {
    title:["biology","history"]
  }
}]
//количество записей
var countrecords=0;
//количество подзапросов
var y=0;
//количество запросов
var x=0
var z=0
app.get('/', (request, response) => {
var time=Date.now()
//console.log(time);
for (i=0;i<customer.length;i++)
{
pool.query('INSERT INTO customers  (firstname,lastname,key) VALUES ($1, $2,$3) RETURNING id,key',[customer[i].firstname,customer[i].lastname,customer[i].key])
.then(res => {
//  console.log(Date.now());
  time=Date.now()-time
  countrecords++;
  x++
var  custid=res.rows[0].id
var key=res.rows[0].key
z=z+customer[key].orders.title.length
for (j=0;j<customer[key].orders.title.length;j++){
 pool.query('INSERT INTO orders  (customerid,title) VALUES ($1, $2)',[custid,customer[key].orders.title[j]])
 .then(res => {
  // console.log(Date.now());
   time=Date.now()-time
countrecords++
y++
if (x===customer.length && z===y){
  //console.log(Date.now());
  //console.log("количество вставленных записей:"+countrecords);
  //console.log("общее время на выполнение запросов:"+time+"ms");
  response.send("количество вставленных записей:"+countrecords+" "
  +"общее время на выполнение запросов:"+time+"ms")
}

 }
 ).catch(e => console.error(e.stack))
}
}).catch(e => console.error(e.stack))
}
})
app.listen(3000, () => {
  console.log("приложение работает порт:3000")
});
