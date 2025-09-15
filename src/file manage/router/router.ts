import { Router } from 'express';
import { fileManagerController } from '../controller/file-manage-controller';
import { upload } from '../middlewares/upload';

const router = Router();

// rota com upload de arquivo
router.post('/file', upload.single('file'), (req, res) => fileManagerController.create(req, res));

// router.get('/file/:id', (req, res) => fileManagerController.read(req, res));
// router.delete('/file/:id', (req, res) => fileManagerController.delete(req, res));

export const fileManagerRouter = router;
