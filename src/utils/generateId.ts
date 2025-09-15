import crypto from 'crypto';

export const generateIdFile = (name: string) => {
  const id = crypto.createHash('sha256').update(name).digest('hex');
  const shortHash = id.slice(0, 16);
  const extension = name.split('.').pop();
  return `${shortHash}.${extension}`;
};
