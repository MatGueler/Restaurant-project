import express from 'express';
import dotenv from 'dotenv';
import sequelize from './connection/database.cjs';
import customerRoutes from './routes/customerRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/customer', customerRoutes);

app.get('/', (req, res) => {
    res.send('API está funcionando 🚀');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    try {
        await sequelize.authenticate();
        console.log('🟢 Conectado ao banco de dados!');
        console.log(`🚀 Servidor rodando na porta ${PORT}`);
    } catch (err) {
        console.error('🔴 Falha ao conectar ao banco:', err);
    }
});
