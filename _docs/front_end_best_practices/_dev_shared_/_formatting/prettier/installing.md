Install

First, install Prettier locally:

    npm
    yarn
    pnpm
    bun

npm install --save-dev --save-exact prettier

Then, create an empty config file to let editors and other tools know you are using Prettier:

node --eval "fs.writeFileSync('.prettierrc','{}\n')"

Next, create a .prettierignore file to let the Prettier CLI and editors know which files to not format. Here’s an example:

node --eval "fs.writeFileSync('.prettierignore','# Ignore artifacts:\nbuild\ncoverage\n')"

tip

Prettier will follow rules specified in .gitignore if it exists in the same directory from which it is run. You can also base your .prettierignore on .eslintignore (if you have one).
Another tip

If your project isn’t ready to format, say, HTML files yet, add \*.html.

Now, format all files with Prettier:

    npm
    yarn
    pnpm
    bun

npx prettier . --write

info

What is that npx thing? npx ships with npm and lets you run locally installed tools. We’ll leave off the npx part for brevity throughout the rest of this file!
warning

If you forget to install Prettier first, npx will temporarily download the latest version. That’s not a good idea when using Prettier, because we change how code is formatted in each release! It’s important to have a locked down version of Prettier in your package.json. And it’s faster, too.

prettier --write . is great for formatting everything, but for a big project it might take a little while. You may run prettier --write app/ to format a certain directory, or prettier --write app/components/Button.js to format a certain file. Or use a glob like prettier --write "app/\*_/_.test.js" to format all tests in a directory (see fast-glob for supported glob syntax).

If you have a CI setup, run the following as part of it to make sure that everyone runs Prettier. This avoids merge conflicts and other collaboration issues!

npx prettier . --check

--check is like --write, but only checks that files are already formatted, rather than overwriting them. prettier --write and prettier --check are the most common ways to run Prettier.
Set up your editor

Formatting from the command line is a good way to get started, but you get the most from Prettier by running it from your editor, either via a keyboard shortcut or automatically whenever you save a file. When a line has gotten so long while coding that it won’t fit your screen, just hit a key and watch it magically be wrapped into multiple lines! Or when you paste some code and the indentation gets all messed up, let Prettier fix it up for you without leaving your editor.

See Editor Integration for how to set up your editor. If your editor does not support Prettier, you can instead run Prettier with a file watcher.
note

Don’t skip the regular local install! Editor plugins will pick up your local version of Prettier, making sure you use the correct version in every project. (You wouldn’t want your editor accidentally causing lots of changes because it’s using a newer version of Prettier than your project!)

And being able to run Prettier from the command line is still a good fallback, and needed for CI setups.
ESLint (and other linters)

If you use ESLint, install eslint-config-prettier to make ESLint and Prettier play nice with each other. It turns off all ESLint rules that are unnecessary or might conflict with Prettier. There’s a similar config for Stylelint: stylelint-config-prettier

(See Prettier vs. Linters to learn more about formatting vs linting, Integrating with Linters for more in-depth information on configuring your linters, and Related projects for even more integration possibilities, if needed.)
Git hooks

In addition to running Prettier from the command line (prettier --write), checking formatting in CI, and running Prettier from your editor, many people like to run Prettier as a pre-commit hook as well. This makes sure all your commits are formatted, without having to wait for your CI build to finish.

For example, you can do the following to have Prettier run before each commit:

    Install husky and lint-staged:

    npm
    yarn
    pnpm
    bun

npm install --save-dev husky lint-staged
npx husky init
node --eval "fs.writeFileSync('.husky/pre-commit','npx lint-staged\n')"

    Add the following to your package.json:

{
"lint-staged": {
"\*_/_": "prettier --write --ignore-unknown"
}
}

note

If you use ESLint, make sure lint-staged runs it before Prettier, not after.

See Pre-commit Hook for more information.
Summary

To summarize, we have learned to:

    Install an exact version of Prettier locally in your project. This makes sure that everyone in the project gets the exact same version of Prettier. Even a patch release of Prettier can result in slightly different formatting, so you wouldn’t want different team members using different versions and formatting each other’s changes back and forth.
    Add a .prettierrc to let your editor know that you are using Prettier.
    Add a .prettierignore to let your editor know which files not to touch, as well as for being able to run prettier --write . to format the entire project (without mangling files you don’t want, or choking on generated files).
    Run prettier --check . in CI to make sure that your project stays formatted.
    Run Prettier from your editor for the best experience.
    Use eslint-config-prettier to make Prettier and ESLint play nice together.
    Set up a pre-commit hook to make sure that every commit is formatted
