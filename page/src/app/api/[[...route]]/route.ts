import {Hono} from 'hono'
import {handle} from 'hono/vercel'
import {ListObjectsV2Command, S3Client} from "@aws-sdk/client-s3";

export const runtime = 'edge'

const jsonHeader = {
    "Content-Type": "Application/Json",
};

const app = new Hono().basePath('/api')

const s3Client = new S3Client({
    region: "auto",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
    endpoint: process.env.S3_ENDPOINT,

});

app.get('/list', async () => {
    try {
        const command = new ListObjectsV2Command({
            Bucket: process.env.S3_UPLOAD_BUCKET!,
            Prefix: "",
            Delimiter: "",
        });
        const result = await s3Client.send(command);
        const keys = result.Contents?.map((o) => o.Key) || [];
        return new Response(JSON.stringify(keys), {
            headers: jsonHeader,
        });
    } catch (error) {
        return new Response(error?.toString(), {status: 500});
    }
})

export const GET = handle(app)