import { Router } from 'express';
import { citiesController } from '../controllers';

const router = Router();

router.get('/', (req, res) => {
    return res.json('Olá, DEV!');
});



router.post('/cidades', citiesController.create);

export { router };