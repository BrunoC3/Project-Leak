import z from 'zod';
import { EZod } from 'enum/zod-enum';
import { IUser } from '../interface/user-interface';

export class UserValidation {
  public create({ email, name, password }: Partial<IUser>) {
    const ZUserSchema = z.object({
      name: z.string().optional(),
      email: z.string().email({ message: `Email ${EZod.REQUIRED}` }),
      password: z.string().min(8, { message: `${EZod.REQUIRED_PASSWORD}` }),
    });
    return ZUserSchema.parse({ email, name, password });
  }

  public read(id: string) {
    const ZUserSchema = z.string().min(26, { message: `ID ${EZod.REQUIRED}` });
    return ZUserSchema.parse(id);
  }

  public update({ id, name }: { id: string; name?: string }) {
    const ZUserSchema = z.object({
      id: z.string().min(26, { message: `ID ${EZod.REQUIRED}` }),
      name: z.string().min(1, { message: `Nome ${EZod.REQUIRED}` }),
    });
    return ZUserSchema.parse({ id, name });
  }

  public delete(id: string) {
    const ZUserSchema = z.string().min(26, { message: `ID ${EZod.REQUIRED}` });
    return ZUserSchema.parse(id);
  }
}

export const userValidation = new UserValidation();
