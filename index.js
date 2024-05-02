import express from 'express';
import path from 'path';
// app
const app = express();
const PORT = 3000;

// contenido estatico

app.use(express.static('assets'));

// PATH
const __dirname = path.resolve();

// arreglo formato JSON con usuarios

const lista_usuarios = {
    "usuarios" : [
        "Juan",
        "Felipe",
        "Astrid",
        "Maria",
        "Ignacia",
        "Javier",
        "Brian"
    ]
};

// MIDDLEWARES

const validar_usuario = (req,res,next) => {
    const usuario_param = req.params.usuario;
    let usuario_existe = false;
    if (lista_usuarios.usuarios.includes(usuario_param)) {
        usuario_existe = true;
    }
    usuario_existe ? next() : res.sendFile(__dirname + '/assets/who.jpeg');
}

// RUTAS

    // usuarios
app.get('/abracadabra/usuarios',(req,res) => {
    res.json(lista_usuarios);
});
    // validacion de usuario
app.get('/abracadabra/juego/:usuario',validar_usuario, (req,res) => {
    const usuario_param_juego = req.params.usuario;
    res.send(`${usuario_param_juego} existe!`);
});
    // azar conejito vs voldemort
app.get('/abracadabra/conejo/:n', (req,res) => {
    const num_azar = Math.floor(Math.random() * 4) + 1;
    const num_param = req.params.n;

    if (num_azar == num_param) {
        res.sendFile(__dirname + '/assets/conejito.jpg');
    } else {
        res.sendFile(__dirname + '/assets/voldemort.jpg')
    }
})

    // index (juego gráfico)
app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html')
})
    // ruta no existente
app.get('*', (req,res) => {
    res.send('Esta página no existe...');
})
// FIN RUTAS

// LISTEN
app.listen(PORT,() => {
    console.log(`Server UP on http://localhost:${PORT}`);
})