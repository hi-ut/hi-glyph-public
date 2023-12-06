import { ManagedUpload } from "aws-sdk/clients/s3";
import { s3 } from "./aws-s3";

const bucket = process.env.S3_UPLOAD_BUCKET!;

export async function s3Upload(fileName: string, fileData: Buffer) {
  const uploadParams: AWS.S3.PutObjectRequest = {
    Bucket: bucket,
    Key: fileName,
    Body: fileData,
  };

  try {
    const upload: ManagedUpload = s3.upload(uploadParams);
    const result: ManagedUpload.SendData = await upload.promise();
    console.log(`Uploaded ${fileName} to S3: `, result.Location);
  } catch (error: any) {
    console.log(error);
  }
}
