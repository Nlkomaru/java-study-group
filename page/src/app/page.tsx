import {css} from '@/styled-system/css';
import React from "react";
import SlideCard from "~/components/SlideCard";
import {headers} from "next/headers";

export const runtime = "edge";

export default async function Home() {

    const headersData = await headers()
    const host = headersData.get('host');
    if (!host) {
        throw new Error("Host header is missing");
    }
    const protocol = headersData.get('x-forwarded-proto') ?? (host.startsWith('localhost') ? 'http' : 'https');const apiBase = `${protocol}://${host}`
    const url = `${apiBase}/api/list`

    const list = (await fetch(url).then(res => res.json<string[]>())).map(id => id.split("/")[0])

    let data = Array.from(new Set(list))

    const slideList: SlideGroup[] = [
        {
            "Group": "環境構築",
            "list": [
                {slide: "java-1", title: "JDKのインストール"},
            ]
        }
    ]

    slideList.forEach((group) => {
        group.list.map((slide) => {
            data = data.filter(n => n !== slide.slide);
        })
    })

    if (data.length !== 0) {
        slideList.push({
            "Group": "その他",
            "list": data.map((slide) => {
                return {slide: slide, title: slide}
            })
        })
    }

    return (
        <>
            <div className={css({fontSize: "xl", fontWeight: 'bold', paddingBottom: "30px"})}>Slide List</div>
            <ul>
                {slideList.map((slide) => (
                    <li key={slide.Group}>
                        <h2 className={css({fontSize: "xl", fontWeight: 'bold', paddingBottom: "10px"})}>{slide.Group}</h2>
                        <ul className={css({display: "flex"})}>
                            {slide.list
                                .map((slideName) => getSlideInfo(slideName.slide, slideName.title))
                                .map((slideInfo) => (
                                    <li key={slideInfo.slideTitle}>
                                        <SlideCard slideInfo={slideInfo}/>
                                    </li>
                                ))}
                        </ul>
                    </li>
                ))
                }
            </ul>
        </>
    )
}

function getSlideInfo(slide: string, title: string): SlideInfo {
    return {
        slideTitle: title,
        slideName: slide,
        slideUrl: `https://${process.env.NEXT_PUBLIC_S3_HOST_NAME}/${slide}/index.html`,
        pdfUrl: `https://${process.env.NEXT_PUBLIC_S3_HOST_NAME}/${slide}/slidev-exported.pdf`,
        imageUrl: `https://${process.env.NEXT_PUBLIC_S3_HOST_NAME}/${slide}/picture/1.png`,
    }
}

export type SlideInfo = {
    slideTitle: string;
    slideName: string;
    slideUrl: string;
    pdfUrl: string;
    imageUrl: string;
}

export type SlideGroup = {
    Group: string;
    list: slide[];
}

export type slide = {
    slide: string;
    title: string;
}