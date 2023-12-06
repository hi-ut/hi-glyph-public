import { S3 } from "aws-sdk";

export const s3 = new S3({
  accessKeyId: process.env.AKIAWUU44O2QWJEDTGIQ,
  secretAccessKey: process.env.S3_UPLOAD_SECRET,
  region: process.env.S3_UPLOAD_REGION,
})