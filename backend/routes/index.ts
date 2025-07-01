// routes/index.ts
import { Router } from 'express';
import promptRoutes from './prompts';
import feedbackRoutes from './feedback';

const router = Router();

router.use('/prompts', promptRoutes);
router.use('/feedback', feedbackRoutes);

export default router;
