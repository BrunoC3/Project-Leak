import fs from 'fs';
import path from 'path';

class FileService {
  private uploadDir = path.resolve('uploads');

  constructor() {
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  public async save(file: Express.Multer.File) {
    const filePath = path.join(this.uploadDir, file.originalname);

    await fs.promises.writeFile(filePath, file.buffer); // se memoryStorage

    return {
      filename: file.originalname,
      path: filePath,
      mimetype: file.mimetype,
      size: file.size,
    };
  }
}

export const fileService = new FileService();
