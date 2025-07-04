Install Tailwind CSS

Install Tailwind CSS with Next.js (v3 and v4)
Tailwind CSS v4 Installation
Create your project

npx create-next-app@latest my-project --typescript --eslint
cd my-project

Install Tailwind CSS

npm install tailwindcss @tailwindcss/postcss @tailwindcss/cli

Create your CSS file

Create a new CSS file (e.g., app/globals.css) and add the Tailwind import:
app/globals.css

@import "tailwindcss";

@theme inline {
/_ Configure your theme variables here _/
--font-display: "Inter", "sans-serif";
--color-primary-500: oklch(0.84 0.18 117.33);
--spacing: 0.25rem;
}

Configure PostCSS

Update your PostCSS configuration:
postcss.config.js

module.exports = {
plugins: {
"@tailwindcss/postcss": {},
},
};

Start your build process

npm run dev

Start using Tailwind
app/page.tsx

export default function Home() {
return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
}

Tailwind CSS v3 Installation (Legacy)
Create your project

npx create-next-app@latest my-project --typescript --eslint
cd my-project

Install Tailwind CSS

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

Configure your template paths
tailwind.config.ts

/** @type {import('tailwindcss').Config} \*/
module.exports = {
content: [
"./app/**/_.{js,ts,jsx,tsx,mdx}",
"./pages/\*\*/_.{js,ts,jsx,tsx,mdx}",
"./components/\*_/_.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",

],
theme: {
extend: {},
},
plugins: [],
};

Add the Tailwind directives to your CSS
globals.css

@tailwind base;
@tailwind components;
@tailwind utilities;

Start your build process

npm run dev

Start using Tailwind
index.tsx

export default function Home() {
return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
}

Key Differences in v4

    CSS-First Configuration: Theme configuration is now done in CSS using the @theme inline directive instead of tailwind.config.js
    New Import Syntax: Use @import "tailwindcss" instead of the three @tailwind directives
    Package Changes:
        PostCSS plugin is now @tailwindcss/postcss
        CLI is now @tailwindcss/cli
    Native CSS Cascade Layers: Uses real CSS @layer instead of Tailwind's custom implementation
    CSS Variables: All design tokens are available as CSS variables (e.g., --color-blue-500, --font-sans)

For more advanced configuration options in v4, you can:

/_ Custom utilities _/
@utility container {
margin-inline: auto;
padding-inline: 2rem;
}

/_ Custom variants _/
@variant dark (&:where(.dark, .dark \*));

/_ Add plugins _/
@plugin "@tailwindcss/typography";
