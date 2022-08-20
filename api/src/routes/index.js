const { Router } = require('express');
const dogRutas = require('./dogs.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/', dogRutas )


module.exports = router;
