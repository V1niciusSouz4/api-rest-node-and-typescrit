import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    return res.json('Olá, DEV!');
});
router.post('/teste', (req, res) => {
    return res.status(401).json(req.body);
});

export { router };