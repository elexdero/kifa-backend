import Express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { PORT } from './config.js';
import './db.js';
import authRoutes from '../routes/auth.routes.js';
import tableRoutes from '../routes/tables.routes.js';
import examenRoutes from '../routes/examen.routes.js';


const app = Express();

app.use(cors());
app.use(morgan('dev'));
app.use(Express.json());


app.use('/api', authRoutes, tableRoutes, examenRoutes);


app.get('/api', (req, res) => {
    res.send('Servidor funcionando correctamente');
});

app.use((err, req, res, next) => {
    //middleWare de errores generales
    if (err.code && err.code.includes('DENIED_ERROR')) {
        return res.status(403).json({
            message: "Acceso denegado: Tu rol actual no tiene permisos para realizar esta acción."
        });
    }

    const status = err.status || 500;
    return res.status(status).json({
        message: err.message
    });
});

app.listen(PORT || 4000, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT || 4000}`);
});


