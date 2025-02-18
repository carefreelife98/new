import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    output: 'export', // 정적 HTML 내보내기 설정
    images: {
        unoptimized: true, // GitHub Pages 배포를 위해 필요
    },
    basePath: '/new', // GitHub repository 이름
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
