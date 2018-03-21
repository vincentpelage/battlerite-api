/*
 * Npm import
 */
const express = require('express');

/*
 * Local import
 */
const getBddDatas = require('../controllers/bddDatas');

/*
 * Instanciations
 */

// instanciation du routeur
const router = express.Router();

/*
 * Router
 */

router
  .route('/get-bdd-datas')
  .get(getBddDatas);

// export du router contenant les routes
// export default router;
module.exports = router;
