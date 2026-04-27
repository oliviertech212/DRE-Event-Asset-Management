import express from 'express';
import {
  getAllAssets,
  getAllAssetsAdmin,
  getAssetById,
  createAsset,
  updateAsset,
  deleteAsset,
} from '../controllers/assetController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.get('/', getAllAssets);
router.get('/admin', authenticate, getAllAssetsAdmin);
router.get('/:id', getAssetById);
router.post('/', authenticate, createAsset);
router.put('/:id', authenticate, updateAsset);
router.delete('/:id', authenticate, deleteAsset);

export default router;
