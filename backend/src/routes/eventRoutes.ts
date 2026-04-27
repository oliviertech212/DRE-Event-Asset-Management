import express from 'express';
import {
  getAllEvents,
  getAllEventsAdmin,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../controllers/eventController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.get('/', getAllEvents);
router.get('/admin', authenticate, getAllEventsAdmin);
router.get('/:id', getEventById);
router.post('/', authenticate, createEvent);
router.put('/:id', authenticate, updateEvent);
router.delete('/:id', authenticate, deleteEvent);

export default router;
