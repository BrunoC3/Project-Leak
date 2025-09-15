import { Document } from 'mongoose';

export interface IFile extends Document {
  filename: string;
  originalname: string;
  path: string;
  mimetype: string;
  size: number;
  status: string;
  createdAt: Date;
}
