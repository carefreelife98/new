import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

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
