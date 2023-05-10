const express = require('express');
const router = express.Router();
const statesController = require('../../controllers/statesController');

// Route to get all states
router.get('/', statesController.getAllStates);

// Route to get state by name
router.get('/:state', statesController.getState);

// Route to get state capital by code
router.get('/:code/capital', statesController.getCapital);

// Route to get state nickname by code
router.get('/:code/nickname', statesController.getNickname);

// Route to get state population by code
router.get('/:code/population', statesController.getPopulation);

// Route to get state admission by code
router.get('/:code/admission', statesController.getAdmission);

// Route to get state fun facts by code, create new fun fact, delete fun fact, and update fun fact
router
  .get('/:code/funfact', statesController.getFunFact)
  .post('/:code/funfact', statesController.createFunFact)
  .patch('/:code/funfact', statesController.updateFunFact)
  .delete('/:code/funfact', statesController.deleteFunFact);



module.exports = router;
