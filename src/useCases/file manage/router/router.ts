import { Router } from 'express';
import multer from 'multer';
import { fileManagerController } from '../controller/file-manage-controller';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/file', upload.single('file'), (req, res) => fileManagerController.create(req, res));

// router.get('/file/:id', (req, res) => fileManagerController.read(req, res));
// router.delete('/file/:id', (req, res) => fileManagerController.delete(req, res));

export const fileManagerRouter = router;
