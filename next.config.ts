import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    output: 'export', // 정적 HTML 내보내기 설정
    images: {
        unoptimized: true, // GitHub Pages 배포를 위해 필요
    },
    trailingSlash: true, // 정적 HTML 파일이 디렉토리 구조로 배포되도록 설정
    // GitHub Pages에서 제공되는 서브 디렉토리 경로를 설정
    basePath: process.env.NODE_ENV === 'production' ? '/new' : '',
    assetPrefix: '/new',
    webpack: (config) => {
        config.module.rules.push({
            test: /\.md$/,
            use: 'raw-loader',
        });
        return config;
    },
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
