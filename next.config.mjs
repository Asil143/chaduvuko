import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeHighlight from 'rehype-highlight'

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, rehypeHighlight],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  experimental: {
    serverComponentsExternalPackages: ['sql.js', 'youtube-sr'],
  },
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  async headers() {
    return [
      {
        source: '/sqljs/:file*',
        headers: [
          { key: 'Content-Type', value: 'application/wasm' },
          { key: 'Cross-Origin-Embedder-Policy', value: 'require-corp' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
        ],
      },
    ];
  },
  async redirects() {
    // Planned course pages that are now live tracks, and lessons merged into another lesson.
    const promoted = ['agentic-ai', 'devops-mlops', 'javascript', 'full-stack-ai', 'analytics-engineering-data-analytics', 'operating-systems', 'generative-ai', 'system-design', 'ai-security'];
    return [
      ...promoted.map(slug => ({ source: `/learn/track-plan/${slug}`, destination: `/learn/${slug}`, permanent: true })),
      { source: '/learn/what-is-data-engineering', destination: '/learn/data-engineering/what-is-data-engineering', permanent: true },
      { source: '/learn/foundations/sql', destination: '/learn/data-engineering/sql-for-de', permanent: true },
      { source: '/learn/foundations/python', destination: '/learn/data-engineering/python-for-de', permanent: true },
      { source: '/learn/track-plan/business-intelligence', destination: '/learn/analytics-engineering-data-analytics', permanent: true },
      { source: '/learn/ai-ml/nlp/llm-agents-and-tool-use', destination: '/learn/ai-ml/generative-ai/agents-tool-use', permanent: true },
    ];
  },
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'vscode': false,
    };
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      };
    }
    return config;
  },
}

export default withMDX(nextConfig)
