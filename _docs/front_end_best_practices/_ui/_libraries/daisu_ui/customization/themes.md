daisyUI themes

How to use daisyUI themes?

daisyUI comes with 35 built-in themes that instantly transform your website's entire look - a time-saver that lets you focus on building rather than deciding on colors.
You can also create your own custom themes or customize built-in themes.

You can manage themes by adding brackets in front of@plugin "daisyui"in your CSS file.
app.css

@import "tailwindcss";

@plugin "daisyui";

@plugin "daisyui" {

themes: light --default, dark --prefersdark;

}

    themesis a comma-separated list of theme names you want to enable.
    You can set--defaultflag for a theme to make it the default theme.
    You can also set--prefersdarkflag for a theme to make it the default theme for dark mode (prefers-color-scheme: dark).

Enable a built-in theme

By default,lightanddarkthemes are enabled. Let's enablecupcaketheme:
app.css

@import "tailwindcss";
@plugin "daisyui" {
themes: light --default, dark --prefersdark, cupcake;
}

And setcupcaketheme for the page:
index.html

<html data-theme="cupcake"></html>

    I suggest using theme-change, so you can switch themes and save selected theme in local storage.

List of themes
Try them:
light
A
A
A
A
dark
A
A
A
A
cupcake
A
A
A
A
bumblebee
A
A
A
A
emerald
A
A
A
A
corporate
A
A
A
A
synthwave
A
A
A
A
retro
A
A
A
A
cyberpunk
A
A
A
A
valentine
A
A
A
A
halloween
A
A
A
A
garden
A
A
A
A
forest
A
A
A
A
aqua
A
A
A
A
lofi
A
A
A
A
pastel
A
A
A
A
fantasy
A
A
A
A
wireframe
A
A
A
A
black
A
A
A
A
luxury
A
A
A
A
dracula
A
A
A
A
cmyk
A
A
A
A
autumn
A
A
A
A
business
A
A
A
A
acid
A
A
A
A
lemonade
A
A
A
A
night
A
A
A
A
coffee
A
A
A
A
winter
A
A
A
A
dim
A
A
A
A
nord
A
A
A
A
sunset
A
A
A
A
caramellatte
A
A
A
A
abyss
A
A
A
A
silk
A
A
A
A
Enable all themes

Enable all 35 built-in themes by settingthemestoall:
app.css

@import "tailwindcss";
@plugin "daisyui" {
themes: all;
}

Disable a theme

To disabledarktheme for example, remove it from the list. Now only light theme is included:
app.css

@import "tailwindcss";
@plugin "daisyui" {

themes: light --default, dark --prefersdark;

themes: light --default;
}

If for some reason you want to disable all themes and remove all daisyUI colors, setthemestofalse:
app.css

@import "tailwindcss";
@plugin "daisyui" {
themes: false;
}

How to use a theme only for a section of a page?
Add data-theme='THEME_NAME' to any element and everything inside will have your theme. You can nest themes and there is no limit! You can force a section of your HTML to only use a specific theme.
index.html

<html data-theme="dark">
  <div data-theme="light">
    This div will always use light theme
    <span data-theme="retro">This span will always use retro theme!</span>
  </div>
</html>

How to add a new custom theme?

To add a new theme, use@plugin "daisyui/theme" {}in your CSS file, with the following structure:
app.css

@import "tailwindcss";
@plugin "daisyui";
@plugin "daisyui/theme" {
name: "mytheme";
default: true; /_ set as default _/
prefersdark: false; /_ set as default dark mode (prefers-color-scheme:dark) _/
color-scheme: light; /_ color of browser-provided UI _/

--color-base-100: oklch(98% 0.02 240);
--color-base-200: oklch(95% 0.03 240);
--color-base-300: oklch(92% 0.04 240);
--color-base-content: oklch(20% 0.05 240);
--color-primary: oklch(55% 0.3 240);
--color-primary-content: oklch(98% 0.01 240);
--color-secondary: oklch(70% 0.25 200);
--color-secondary-content: oklch(98% 0.01 200);
--color-accent: oklch(65% 0.25 160);
--color-accent-content: oklch(98% 0.01 160);
--color-neutral: oklch(50% 0.05 240);
--color-neutral-content: oklch(98% 0.01 240);
--color-info: oklch(70% 0.2 220);
--color-info-content: oklch(98% 0.01 220);
--color-success: oklch(65% 0.25 140);
--color-success-content: oklch(98% 0.01 140);
--color-warning: oklch(80% 0.25 80);
--color-warning-content: oklch(20% 0.05 80);
--color-error: oklch(65% 0.3 30);
--color-error-content: oklch(98% 0.01 30);

/_ border radius _/
--radius-selector: 1rem;
--radius-field: 0.25rem;
--radius-box: 0.5rem;

/_ base sizes _/
--size-selector: 0.25rem;
--size-field: 0.25rem;

/_ border size _/
--border: 1px;

/_ effects _/
--depth: 1;
--noise: 0;
}

If you're using CDN and you want to use a custom theme, use it like this:
app.css

:root:has(input.theme-controller[value=mytheme]:checked),[data-theme="mytheme"] { /_ mytheme is the name of the custom theme _/
color-scheme: light;
--color-base-100: oklch(98% 0.02 240);
/_ ...rest of CSS variables like above example _/
}

How to customize an existing theme?

To customize a built-in theme, you can use the same structure as adding a new theme, but with the same name as the built-in theme. For example, to customize thelighttheme:
app.css

@import "tailwindcss";
@plugin "daisyui";
@plugin "daisyui/theme" {
name: "light";
default: true;
--color-primary: blue;
--color-secondary: teal;
}

All the other values will be inherited from the original theme.
How to add custom styles for a specific theme?
You can write custom style for your elements only for a specific theme. In this example, .my-btn class only will have this style on light theme.
app.css

[data-theme="light"] {
.my-btn {
background-color: #1EA1F1;
border-color: #1EA1F1;
}
.my-btn:hover {
background-color: #1C96E1;
border-color: #1C96E1;
}
}

How to apply Tailwind's 'dark:' selector for specific themes
daisyUI can be configured to use Tailwind's `dark:` prefix For example if you want a padding only for a daisyUI dark theme you can use `dark:p-10` In the example below, 'night' is darkmode theme so we add it to `@variant dark`
app.css

@import "tailwindcss";
@plugin "daisyui" {
themes: winter --default, night --prefersdark;
}

@custom-variant dark (&:where([data-theme=night], [data-theme=night] \*));

index.html

<div class="p-10 dark:p-20">
  I will have 10 padding on winter theme and 20 padding on night theme
</div>
