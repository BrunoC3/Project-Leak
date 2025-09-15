import { IFile } from 'useCases/file manage/interfaces/IFile';
import { Schema, model } from 'mongoose';

const fileSchema = new Schema<IFile>({
  fileID: { type: String, required: true, unique: true },
  originalname: { type: String, required: true },
  path: { type: String, required: true },
  mimetype: { type: String, required: true },
  size: { type: Number, required: true },
  status: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const FileModel = model<IFile>('File', fileSchema);
