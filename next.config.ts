import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    output: 'export', // 정적 HTML 내보내기 설정
    images: {
        unoptimized: true, // GitHub Pages 배포를 위해 필요
    },
    // GitHub Pages에서 제공되는 서브 디렉토리 경로를 설정
    basePath: '/new',
    assetPrefix: '/new/',
    env: {
        NEXT_PUBLIC_IMAGE_URL: process.env.NEXT_PUBLIC_IMAGE_URL || '/assets/images',
    },
};

module.exports = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'capsule-render.vercel.app',
                pathname: '/api*', // 이미지 API 경로에 맞게 설정
            },
        ],
        dangerouslyAllowSVG: true, // SVG 허용 설정
    },
};

export default nextConfig;
