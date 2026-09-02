import { S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
import path from 'path';

// Ensure dotenv is loaded immediately when this module is evaluated
dotenv.config();
dotenv.config({ path: path.resolve(process.cwd(), 'backend/.env') });

const accountId = process.env.R2_ACCOUNT_ID || '';
const accessKeyId = process.env.R2_ACCESS_KEY_ID || '';
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY || '';

export const bucketName = process.env.R2_BUCKET_NAME || 'wwi-website';

export const r2Client = (accountId && accessKeyId && secretAccessKey && accessKeyId !== 'YOUR_CLOUDFLARE_R2_ACCESS_KEY_ID')
  ? new S3Client({
      region: 'auto',
      endpoint: process.env.R2_ENDPOINT || `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId,
        secretAccessKey
      }
    })
  : null;

if (r2Client) {
  console.log(`✅ [Cloudflare R2] S3 Client connected to bucket: "${bucketName}"`);
} else {
  console.warn('[Cloudflare R2] Warning: R2 credentials are missing or unconfigured. Operating with local memory storage fallback.');
}
