import { Client } from 'minio';
import { IStorage } from 'useCases/file manage/interfaces/IStorage';

export class MinioStorage implements IStorage {
  private client: Client;
  private bucket: string;

  constructor() {
    const endpoint = process.env.S3_ENDPOINT || 'localhost';
    const port = Number(process.env.S3_PORT || 9000);

    if (!endpoint) throw new Error('❌ S3_ENDPOINT não definido no .env');

    this.client = new Client({
      endPoint: endpoint,
      port,
      useSSL: false,
      accessKey: process.env.S3_KEY || 'minioadmin',
      secretKey: process.env.S3_SECRET || 'minioadmin',
      region: 'us-east-1',
    });

    this.bucket = process.env.S3_BUCKET || 'project-leak';
  }

  async ensureBucketExists() {
    const exists = await this.client.bucketExists(this.bucket).catch(() => false);
    if (!exists) {
      await this.client.makeBucket(this.bucket, '');
      console.log(`✅ Bucket ${this.bucket} criado no MinIO`);
    }
  }

  async saveFile(file: Express.Multer.File): Promise<string> {
    await this.client.putObject(this.bucket, file.originalname, file.buffer);
    return `${this.bucket}/${file.originalname}`;
  }

  async deleteFile(fileUrl: string): Promise<void> {
    const key = fileUrl.split('/').pop()!;
    await this.client.removeObject(this.bucket, key);
  }
}
