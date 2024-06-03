const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const superviRouter = require('./routers/SupervisorRouter');
<<<<<<< HEAD
const AbonoRouter = require('./routers/AbonoRouter');
=======
const vendeRouter = require('./routers/VendedorRouter');
const clientRouter = require('./routers/ClientesRouter');
const loginRouter = require('./routers/Loginrouter');
>>>>>>> 341d5fb966aa00d9308b7985137c2eb886671291

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
<<<<<<< HEAD
app.use('/Abono', AbonoRouter);
=======
app.use('/usuario', vendeRouter);
app.use('/usuario', clientRouter);
app.use('/ingreso', loginRouter)

>>>>>>> 341d5fb966aa00d9308b7985137c2eb886671291

app.get("/", (req, res) => {
    res.send("¡Hola! Este es el servidor backend!");
    console.log("¡Hola! Este es el servidor backend!");
});


app.listen(PORT, ()=>{
    console.log(`\n\n     El servidor funcionando en el puerto: \x1b[33m[${PORT}]\x1b[33m.`);
    console.log(`\n     Local:                  http://localhost:${PORT}\x1b[0m\n`);
});