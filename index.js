const app = require('express')();

const bodyParser = require('body-parser');
const { request, response } = require('express');


app.use(bodyParser.json());




let clients = [

    { id: 3, nome: 'Angelo Luz', telefone: '5332843050' },
    { id: 1, nome: 'Tiro rapido', telefone: '5332843050' },
    { id: 2, nome: 'Vaciila pouco', telefone: '5332843050' },
    { id: 4, nome: 'irineu', telefone: '5332843050' }
]
app.get('/clients', (request, response) => response.json(clients))

app.get('/clients/:id', (request, response) => {
    const client = clients.filter(value => value.id == request.params.id)
    response.json(client);

})
app.post('/clients', (request, response) => {
    const client = request.body;
    clients.push(client)
    response.json(client);

console.log(request.body)

})


app.put('/clients/:id', (request,response) => {
const id = request.params.id;
const nome = request.body.nome;

let client = clients.filter(value => value.id == id);
client[0].nome = nome;
response.json(client)

})


app.delete('/clients/:id', (request,response)=>{
const id = request.params.id;
clients = clients.filter(value => value.id != id);
response.json(clients)

})

app.listen(3001);