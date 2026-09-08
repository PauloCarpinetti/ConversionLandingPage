import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ancora a raiz do Turbopack neste diretório: conversion_page/ não é a raiz
  // do repositório git (um nível acima), então o Next.js não consegue inferir
  // isso sozinho e avisaria sobre um package-lock.json fora do repositório.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
