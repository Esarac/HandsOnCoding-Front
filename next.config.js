/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env:{
    PORT:3000,
    BACK_URL:"http://back:8080",
    COMPILER_URL:"http://compiler:12345"
  },
}
const removeImports = require("next-remove-imports")();

module.exports = removeImports({});