# 前端复刻收藏馆

这个项目用于收藏和复现好看的前端网页。技术栈固定为纯 `Vue 3 + TypeScript`，运行环境按 `Node.js 24` 准备。

## 技术栈

- `Node.js >= 24.0.0`
- `Vue 3`
- `TypeScript`
- `Vite`
- `vue-router`
- `Tailwind CSS`
- `GSAP`
- `Three.js`
- `Lenis`
- `@VueUse/core`
- `@VueUse/motion`
- `Motion`
- `Anime.js`
- `SplitType`
- `Lottie Web`
- `PixiJS`
- `Matter.js`
- `OGL`
- `Swiper`
- `Embla Carousel`
- `TresJS`

## 启动命令

```bash
npm install
npm run dev
```

常用校验命令：

```bash
npm run typecheck
npm run build
```

本项目是前端展示和视觉复刻项目，不维护自动化测试目录，也不配置 `npm test`。提交前以 TypeScript 检查、生产构建和必要的浏览器截图预览为准。

## 项目规则

- 首页路由 `/` 只作为作品入口墙，自动扫描 `src/views/[数字].vue` 并展示真实存在的复现页面入口。
- 复现页面统一放在 `src/views/` 下，并按 `1.vue`、`2.vue`、`3.vue` 依次命名。
- 每个编号 `.vue` 文件必须是完整单文件组件，必须同时包含 `<template>`、`<script setup lang="ts">`、`<style scoped>`。
- 每个复现页面的模板、样式和 TypeScript 逻辑都必须浓缩在自己的编号 `.vue` 文件中。
- 禁止为复现页面抽公共 Vue 组件、公共样式、公共 composable、公共工具函数或共享 TypeScript 逻辑。
- 编号页可以按复刻需要使用已安装的动效和视觉依赖，例如 Tailwind CSS、GSAP、Three.js、Lenis、@VueUse/core、@VueUse/motion、Motion、Anime.js、SplitType、Lottie Web、PixiJS、Matter.js、OGL、Swiper、Embla Carousel、TresJS。
- 复杂粒子、3D、流体、重度视觉层或高频动画优先使用 WebGL/GPU 渲染，例如 Three.js、OGL、PixiJS、TresJS 或页面内原生 WebGL；避免大量 DOM 节点或逐点 Canvas 2D 绘制拖慢页面。
- Tailwind 入口在 `src/style.css`，全局 CSS 只放 Tailwind 引入、reset、body 基础样式、字体、CSS 变量和少量工具类；具体页面样式仍优先写在编号 `.vue` 的 `<style scoped>` 中。
- 不新增 `src/__tests__` 或其他测试目录；如果需要确认页面质量，优先运行 `npm run typecheck`、`npm run build`，并用浏览器检查实际视觉和交互。
- 如果某个页面需要素材，放到 `src/assets/编号/`，例如 `src/assets/1/` 对应 `src/views/1.vue`。
- 新增页面后不需要手动更新首页卡片或路由；`src/router/index.ts` 和首页会自动扫描编号 `.vue`。
- 如需首页预览图，在对应素材目录放 `cover.avif`、`cover.webp`、`cover.png`、`cover.jpg` 或 `cover.jpeg`。
- 主页、路由、入口文件属于项目外壳；复现作品本身必须遵守编号单文件规则。
- 本项目完成修改后不需要创建独立 reviewer 子智能体检查；按改动范围运行必要的本地检查并确认 Git 状态即可。

## 当前结构

```text
src/
  assets/
    1/
    2/
  router/
    index.ts
  views/
    Home.vue
    1.vue
    2.vue
  App.vue
  main.ts
```

## 新增复现页面流程

1. 新建 `src/views/[下一个编号].vue`，内部写完整的 `template`、`script setup lang="ts"`、`style scoped`。
2. 如有素材，新建 `src/assets/[对应编号]/` 并放入当前页面独占素材；首页预览图命名为 `cover.webp` 等 `cover.*`。
3. 运行 `npm run typecheck` 和 `npm run build`，并在浏览器里检查页面视觉和交互。
