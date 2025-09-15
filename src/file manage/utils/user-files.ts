import fs from 'node:fs';
import path from 'node:path';

export class utilsUserFiles {
  private static userPath = ['assets', 'files'];

  private static validadeteFolderUser(userId: string) {
    return fs.existsSync(path.resolve(...this.userPath, userId));
  }

  public static createFolderUser(userId: string) {
    if (!this.validadeteFolderUser(userId)) {
      fs.mkdirSync(path.resolve(...this.userPath, userId));
    }
  }

  public static deleteFolderUser(userId: string) {
    if (this.validadeteFolderUser(userId)) {
      fs.rmdirSync(path.resolve(...this.userPath, userId), { recursive: true });
    }
  }
}
