export interface IStorage {
  saveFile(file: Express.Multer.File): Promise<string>; // retorna URL ou path do arquivo
  deleteFile(filePath: string): Promise<void>;
}
