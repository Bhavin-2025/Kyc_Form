import express from 'express';
import { 
  getMasterDataByType, 
  getStatesByCountry,
  getCitiesByState
} from '../controllers/masterDataController.js';

const router = express.Router();

// Route for states by country
router.get('/states/:countryCode', getStatesByCountry);

// Route for cities by state
router.get('/cities/:stateCode', getCitiesByState);

// General route for master data by type - must be last to avoid conflicts
router.get('/:type', getMasterDataByType);

export default router;