export default (req, res, next) => {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
        return res.status(400).json({ error: 'Todos os campos (name, email, phone) são obrigatórios.' });
    }

    next();
};

