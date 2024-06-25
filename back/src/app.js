import express, { json } from "express";
import morgan from "morgan";
import { checkConnection } from './db.js';
import authRoutes from './routes/auth.routes.js'

const app = express()

app.use(morgan('dev'))
app.use(express.json())


app.use('/',authRoutes)

app.get('/check-connection', async (req, res) => {
    const isConnected = await checkConnection();
    if (isConnected) {
        res.send('Conexión a la base de datos exitosa');
    } else {
        res.status(500).send('Error conectándose a la base de datos');
    }
});


export default app