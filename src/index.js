import Express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { PORT } from './config.js';
import './db.js';
import authRoutes from '../routes/auth.routes.js';
import tableRoutes from '../routes/tables.routes.js';


const app = Express();

app.use(cors());
app.use(morgan('dev'));
app.use(Express.json());


app.use('/api', authRoutes, tableRoutes);


app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente');
});

app.use((err, req, res, next) => {
    return res.status(500).json({
        message: err.message
    });
});

app.listen(PORT || 4000, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT || 4000}`);
});


