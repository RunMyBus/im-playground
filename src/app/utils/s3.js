export const getS3Url = (key = "") => {
  const bucket = (
    process.env.NEXT_PUBLIC_AWS_S3_MEDIA_BUCKET ||
    process.env.AWS_S3_MEDIA_BUCKET ||
    "imo-qa-uploads"
  ).trim();

  const region = (
    process.env.NEXT_PUBLIC_S3_BUCKET_LOCATION ||
    process.env.S3_BUCKET_LOCATION ||
    "ap-south-1"
  ).trim();

  const hasConfig = bucket.length > 0 && region.length > 0;

  if (!hasConfig) {
    if (key.startsWith("http")) return key;
    return key.startsWith("/") ? key : `/${key}`;
  }

  const sanitizedKey = key.replace(/^\/+/, "");
  return `https://${bucket}.s3.${region}.amazonaws.com/${sanitizedKey}`;
};
