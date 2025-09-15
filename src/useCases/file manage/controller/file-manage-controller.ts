import { Request, Response } from 'express';
import { fileService } from '../service/file-service';

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
      console.error(err);
      return res
        .status(500)
        .json({ message: 'Erro ao salvar o arquivo', error: err.message || err });
    }
  }
}

export const fileManagerController = new FileManageController();
