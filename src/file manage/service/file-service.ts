import { IFile } from 'file manage/interfaces/IFile';
import { fileRepository } from 'file manage/repository/file.repository';

class FileService {
  public async saveFile(file: Express.Multer.File): Promise<IFile> {
    return await fileRepository.save({
      filename: file.filename,
      originalname: file.originalname,
      path: file.path,
      mimetype: file.mimetype,
      size: file.size,
      status: 'PENDING',
    });
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
