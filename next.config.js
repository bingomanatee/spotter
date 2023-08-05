/** @type {import('next').NextConfig} */
const nextConfig = {
  optimizeFonts: false,
  reactStrictMode: true,
  transpilePackages: ['dexie', 'lodash-es', 'rxdb', '@wonderlandlabs/candiland', 'lodash.clonedeep'],
}

module.exports = nextConfig
