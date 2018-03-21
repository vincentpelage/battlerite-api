/*
 * Npm import
 */
const express = require('express');

/*
 * Local import
 */
const getApiDatas = require('../controllers/apiDatas');

/*
 * Instanciations
 */

// instanciation du routeur
const router = express.Router();

/*
 * Router
 */

router
  .route('/get-api-datas')
  .get(getApiDatas);

// export du router contenant les routes
// export default router;
module.exports = router;
