import ReactMarkdown from 'react-markdown';
import Image from "next/image";
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import {ReactElement, ReactNode} from "react";
import {css} from "@/styled-system/css";

export const runtime = 'edge';

interface ImgProps {
    src?: string;  // src is now optional
    alt?: string;
    children?: ReactNode;
}

const notFound = `https://github.com/SAWARATSUKI/KawaiiLogos/blob/main/ResponseCode/404%20NotFound.png?raw=true`

const components = {
    img: ({src, alt, children}: ImgProps): ReactElement =>
        <Image className={css({display: "block", padding: "20px"})}
               src={src ?? notFound}
               alt={alt ?? 'お探しの画像が見つかりませんン'} width={1920}
               height={1080}>{children}</Image>,
};

export default async function Page({params}: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const id = resolvedParams?.id;
    if (!id) {
        throw new Error("ID parameter is missing");
    }

    const res = await fetch(`https://${process.env.NEXT_PUBLIC_S3_HOST_NAME}/${id}/docs.md`);
    if (!res.ok) {
        throw new Error(`Failed to fetch markdown: ${res.statusText}`);
    }
    const markdown = await res.text();

    const urlTransform = (url: string) => {
        if (!url.startsWith("./static")) {
            return url;
        }
        return `https://${process.env.NEXT_PUBLIC_S3_HOST_NAME}/${id}/${url.replace("./", "")}`;
    };

    return (<div className={css({backgroundColor: "#d1f9d4", padding: "100px"})}>
        <div className={css({
            width: "800px",
            margin: "auto",
            padding: "50px",
            fontSize: "l",
            backgroundColor: "white",
        })}>
            <ReactMarkdown className='markdown'
                           urlTransform={urlTransform}
                           remarkPlugins={[remarkGfm, remarkBreaks]}
                           components={components}>{markdown}</ReactMarkdown>
        </div>
    </div>)
}