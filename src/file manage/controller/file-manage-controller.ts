import { Request, Response } from 'express';
import { fileService } from 'file manage/service/file-service';

class FileManageController {
  public async create(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'Nenhum arquivo enviado!' });
      }

      const savedFile = await fileService.saveFile(req.file);

      return res.status(201).json({
        message: 'Arquivo enviado e salvo no banco!',
        file: savedFile,
      });
    } catch (err: any) {
      console.log(err);
    }
  }
}

export const fileManagerController = new FileManageController();
