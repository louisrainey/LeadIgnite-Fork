[text](https://tailwindcss.com/docs/styling-with-utility-classes)

Installation
Get started with Tailwind CSS

Tailwind CSS works by scanning all of your HTML files, JavaScript components, and any other templates for class names, generating the corresponding styles and then writing them to a static CSS file.

It's fast, flexible, and reliable — with zero-runtime.
Installation

    Using Vite
    Using PostCSS
    Tailwind CLI
    Framework Guides
    Play CDN

Installing Tailwind CSS as a Vite plugin

Installing Tailwind CSS as a Vite plugin is the most seamless way to integrate it with frameworks like Laravel, SvelteKit, React Router, Nuxt, and SolidJS.
01
Install Tailwind CSS

Install tailwindcss and @tailwindcss/vite via npm.
Terminal

npm install tailwindcss @tailwindcss/vite

02
Configure the Vite plugin

Add the @tailwindcss/vite plugin to your Vite configuration.
vite.config.ts

import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
plugins: [
tailwindcss(),
],
})

03
Import Tailwind CSS

Add an @import to your CSS file that imports Tailwind CSS.
CSS

@import "tailwindcss";

04
Start your build process

Run your build process with npm run dev or whatever command is configured in your package.json file.
Terminal

npm run dev

05
Start using Tailwind in your HTML

Make sure your compiled CSS is included in the <head> (your framework might handle this for you), then start using Tailwind’s utility classes to style your content.
HTML

<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="/src/styles.css" rel="stylesheet">
</head>
<body>
  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
</body>
</html>
