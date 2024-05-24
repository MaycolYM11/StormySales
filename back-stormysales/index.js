const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const superviRouter = require('./routers/SupervisorRouter');
const vendeRouter = require('./routers/VendedorRouter')
const rutaZona = require('./routers/zonasRouter');

const app = express();
const PORT = process.env.PORT || 3001;

const optionsCors = {
    origin: `http://localhost:3000`,
    methods: 'GET, POST, PUT, DELETE',
    optionsSuccessStatus: 200,  
};
app.use(cors(optionsCors));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/usuario', superviRouter);
app.use('/usuario', vendeRouter);
app.use('/zonas', rutaZona); 

app.get("/", (req, res) => {
    res.send("¡Hola! Este es el servidor backend!");
    console.log("¡Hola! Este es el servidor backend!");
});


app.listen(PORT, ()=>{
    console.log(`\n\n     El servidor funcionando en el puerto: \x1b[33m[${PORT}]\x1b[33m.`);
    console.log(`\n     Local:                  http://localhost:${PORT}\x1b[0m\n`);
});