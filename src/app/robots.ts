// app/robots.ts
export default function robots() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://carefreelife98.github.io/new';

    return {
        rules: {
            userAgent: '*',
            allow: '/',
        },
        sitemap: `${baseUrl}/sitemap.xml`
    };
}