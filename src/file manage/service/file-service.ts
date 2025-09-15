import { IFile } from 'file manage/interfaces/IFile';
import { fileRepository } from 'file manage/repository/file.repository';
import { rabbitMQService } from './rabbitmq.service';

class FileService {
  public async saveFile(file: Express.Multer.File): Promise<IFile> {
    const savedFile = await fileRepository.save({
      filename: file.filename,
      originalname: file.originalname,
      path: file.path,
      mimetype: file.mimetype,
      size: file.size,
      status: 'PENDING',
    });

    if (!rabbitMQService['channel']) {
      await new Promise<void>((resolve, reject) => {
        rabbitMQService.connect('amqp://localhost').then(resolve).catch(reject);
      });
    }

    rabbitMQService.sendToQueue('file_queue', {
      id: savedFile._id,
      filename: savedFile.filename,
      path: savedFile.path,
    });

    return savedFile;
  }

  public async listFiles(): Promise<IFile[]> {
    return await fileRepository.findAll();
  }

  public async getFile(id: string): Promise<IFile | null> {
    return await fileRepository.findById(id);
  }

  public async deleteFile(id: string): Promise<void> {
    await fileRepository.deleteById(id);
  }
}

export const fileService = new FileService();
