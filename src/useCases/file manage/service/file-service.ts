import { IFile } from 'useCases/file manage/interfaces/IFile';
import { fileRepository } from 'useCases/file manage/repository/file.repository';
import { generateIdFile } from 'utils/generateId';
import { IStorage } from '../interfaces/IStorage';
import { rabbitMQService } from './rabbitmq.service';
import { MinioStorage } from './storage/S3Storage';

export class FileService {
  constructor(private storage: IStorage) {}

  public async saveFile(file: Express.Multer.File): Promise<IFile> {
    const generateId = generateIdFile(file.originalname);

    const existingFile = await fileRepository.findOne({ fileID: generateId });
    console.log(existingFile);
    if (existingFile) {
      throw new Error('Arquivo com esse nome já existe!');
    }

    const fileUrl = await this.storage.saveFile({
      ...file,
      fieldname: file.originalname,
      originalname: generateId,
    });

    const fileData = await fileRepository.save({
      fileID: generateId,
      originalname: file.originalname,
      path: fileUrl,
      mimetype: file.mimetype,
      size: file.size,
      status: 'PENDING',
    });

    await rabbitMQService.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
    rabbitMQService.sendToQueue('file_queue', {
      fileId: generateId,
      fileName: fileData.fileID,
      fileSize: fileData.size,
      fileStatus: fileData.status,
    });

    return fileData;
  }

  public async listFiles(): Promise<IFile[]> {
    return fileRepository.findAll();
  }

  public async getFile(id: string): Promise<IFile | null> {
    return fileRepository.findById(id);
  }

  public async deleteFile(id: string): Promise<void> {
    const file = await fileRepository.findById(id);
    if (!file) return;

    await this.storage.deleteFile(file.path);
    await fileRepository.deleteById(id);
  }
}

const storage = new MinioStorage();
await storage.ensureBucketExists();
export const fileService = new FileService(storage);
