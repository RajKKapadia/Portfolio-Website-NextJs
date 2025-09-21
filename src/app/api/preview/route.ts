import { NextResponse } from 'next/server'
import * as cheerio from 'cheerio'

function resolveUrl(baseUrl: string, relativeUrl: string | undefined): string | null {
    if (!relativeUrl) return null;
    try {
        new URL(relativeUrl);
        return relativeUrl;
    } catch {
        try {
            return new URL(relativeUrl, baseUrl).toString();
        } catch {
            return null;
        }
    }
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const url = searchParams.get('url')

    if (!url) {
        return NextResponse.json(
            { error: 'URL is required' },
            { status: 400 }
        )
    }

    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; PreviewBot/1.0)',
            },
        })

        if (!response.ok) {
            throw new Error('Failed to fetch page')
        }

        const html = await response.text()
        const $ = cheerio.load(html)

        let image =
            $('meta[property="og:image"]').attr('content') ||
            $('meta[property="og:image:secure_url"]').attr('content') ||
            $('meta[name="twitter:image"]').attr('content') ||
            $('meta[property="twitter:image"]').attr('content') ||
            $('script[type="application/ld+json"]').map((_, element) => {
                try {
                    const data = JSON.parse($(element).html() || '{}');
                    return data.image || null;
                } catch {
                    return null;
                }
            }).get()[0] ||
            $('img[src]').filter((_, img) => {
                const width = $(img).attr('width');
                return width ? parseInt(width) > 200 : false;
            }).first().attr('src') ||
            null;

        image = resolveUrl(url, image);

        const preview = {
            title: $('meta[property="og:title"]').attr('content') ||
                $('meta[name="twitter:title"]').attr('content') ||
                $('title').text() ||
                null,
            description: $('meta[property="og:description"]').attr('content') ||
                $('meta[name="twitter:description"]').attr('content') ||
                $('meta[name="description"]').attr('content') ||
                null,
            image
        }
        return NextResponse.json(preview)
    } catch (error) {
        console.error('Preview fetch error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch preview' },
            { status: 500 }
        )
    }
}
