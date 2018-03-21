/*
 * Npm import
 */
const express = require('express');

/*
 * Local import
 */
const home = require('../controllers/home');

/*
 * Instanciations
 */

// instanciation du routeur
const router = express.Router();

/*
 * Router
 */

router
  .route('/')
  .get(home);

// export du router contenant les routes
// export default router;
module.exports = router;
