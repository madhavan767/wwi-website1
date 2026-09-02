import { r2Client, bucketName } from '../config/r2.js';
import { PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

export const r2Service = {
  /**
   * Upload file buffer directly to Cloudflare R2 Storage (No local disk persistence)
   */
  async uploadFile(key, buffer, mimeType) {
    if (!r2Client) {
      throw new Error('Cloudflare R2 client is not configured. Please check your R2 environment variables.');
    }

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: buffer,
      ContentType: mimeType
    });

    await r2Client.send(command);

    // Formulate public URL for media preview
    const publicDomain = process.env.R2_PUBLIC_DOMAIN;
    const publicUrl = publicDomain
      ? `${publicDomain.replace(/\/$/, '')}/${key}`
      : `${process.env.R2_ENDPOINT || 'https://6c28b0e0827eba9ab14775371b708494.r2.cloudflarestorage.com'}/${bucketName}/${key}`;

    return {
      key,
      url: publicUrl
    };
  },

  /**
   * Stream/retrieve file buffer from Cloudflare R2
   */
  async getFileStream(key) {
    if (!r2Client) {
      throw new Error('Cloudflare R2 client is not configured.');
    }

    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key
    });

    const response = await r2Client.send(command);
    return {
      stream: response.Body,
      contentType: response.ContentType,
      contentLength: response.ContentLength
    };
  },

  /**
   * Delete file from Cloudflare R2
   */
  async deleteFile(key) {
    if (!r2Client) return true;

    const command = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: key
    });
    await r2Client.send(command);
    return true;
  }
};
