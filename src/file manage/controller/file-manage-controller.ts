import { Request, Response } from 'express';
import { fileService } from 'file manage/service/file-service';

class FileManageController {
  public async create(req: Request, res: Response) {
    try {
      let savedFile = null;
      if (req.file) {
        savedFile = {
          filename: req.file.filename,
          originalname: req.file.originalname,
          path: req.file.path,
          mimetype: req.file.mimetype,
          size: req.file.size,
        };
      }

      return res.status(201).json({
        message: `Deu bom!`,
        data: fileService,
        file: savedFile,
      });
    } catch (err: any) {
      console.log(err);
    }
  }
}

export const fileManagerController = new FileManageController();
