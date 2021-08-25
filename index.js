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

function log(request, reponse, next) {
    const { url, method } = request;
    console.log(`${method} - ${url} at ${new Date()}`);
    return next();
}
app.use(log)

app.get('/clients', (request, response) => response.status(200).json(clients))

app.get('/clients/:id', (request, response) => {
    const { id } = request.params;
    const client = clients.find(value => value.id == id);
    if (client == undefined) {
        response.status(400).send({ error: "mensagem invalida" })
    } else {
        response.status(200).json(clients);

    }

    // const client = clients.filter(value => value.id == request.params.id)
    response.json(client);

})
app.post('/clients', (request, response) => {
    const client = request.body;
    clients.push(client)
    response.status(201).json(client);

    console.log(request.body)

})


app.put('/clients/:id', (request, response) => {
    const id = request.params.id;
    const nome = request.body.nome;

    let client = clients.find(value => value.id == id);
    if (client == undefined) {
        response.status(400).send();
    }
    client.nome = nome;
    response.status(201).json(client)

})


app.delete('/clients/:id', (request, response) => {
    const { id } = request.params.id;
    const index = clients.findIndex(value => value.id == id)
    if (index == -1) {
        response.status(400).send();

    } else {
        clients.splice(index, 1)
        response.status(204).send();
    }


   

   

})

app.listen(3001);