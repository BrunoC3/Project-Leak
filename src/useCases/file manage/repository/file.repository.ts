import { IFile } from 'useCases/file manage/interfaces/IFile';
import { FileModel } from 'models/file.model';

export class FileRepository {
  public async save(fileData: Partial<IFile>): Promise<IFile> {
    const file = new FileModel(fileData);
    return await file.save();
  }

  public async findOne({ fileID }: { fileID: string }): Promise<IFile | null> {
    return await FileModel.findOne({ fileID: fileID });
  }

  public async findAll(): Promise<IFile[]> {
    return await FileModel.find().sort({ createdAt: -1 });
  }

  public async findById(id: string): Promise<IFile | null> {
    return await FileModel.findById(id);
  }

  public async deleteById(id: string): Promise<void> {
    await FileModel.findByIdAndDelete(id);
  }
}

export const fileRepository = new FileRepository();
