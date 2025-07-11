Configure Biome

This guide will help you to understand how to configure Biome. It explains the structure of a Biome configuration file and how Biome resolves its configuration. If you are already familiar with the configuration, you may want to take a look at the configuration reference, which details all the options available.

Biome allows you to customize its behavior using CLI options or a configuration file named biome.json or biome.jsonc. We recommend that you create a configuration file for each project. This ensures that each team member has the same configuration in the CLI and in any editor that allows Biome integration. Many of the options available in a configuration file are also available in the CLI.
Configuration file structure
Section titled Configuration file structure

A Biome configuration file is named biome.json or biome.jsonc. It is usually placed in your project’s root directory, next to your project’s package.json.

Because Biome is a toolchain, its configuration is organized around the tools it provides. At the moment, Biome provides three tools: the formatter, the linter and the import sorter (also called the import organizer). All of these tools are enabled by default. You can disable one or several of them using the <tool>.enabled field:
biome.json

{
"$schema": "https://biomejs.dev/schemas/1.9.4/schema.json",
"formatter": {
"enabled": false
},
"linter": {
"enabled": false
},
"organizeImports": {
"enabled": false
}
}

Options that apply to more than one language are placed in the corresponding tool field. Language-specific options of a tool are placed under a <language>.<tool> field. This also allows overriding general options for a given language. You can also enable or disable a tool based on the language. In the following example, we configure the general options formatter.indentStyle and formatter.lineWidth for all the languages. Also, we set the JavaScript-specific option quoteStyle in javascript.formatter and we override formatter.lineWidth. We disabled the formatter for JSON files.
biome.jsonc

{
"formatter": {
"indentStyle": "space", // default is `tab`
"lineWidth": 100 // default is `80`
},
"javascript": {
"formatter": {
"quoteStyle": "single", // default is `double`
"lineWidth": 120 // override `formatter.lineWidth`
}
},
"json": {
"formatter": {
"enabled": false
}
}
}

Note

Biome refers as javascript all variants of the JavaScript language. This includes TypeScript, JSX and TSX.
Configuration file resolution
Section titled Configuration file resolution

Biome uses auto discovery to find the nearest configuration file. It looks in the working directory and in the parent directories until it finds a biome.json or a biome.jsonc file. If no configuration is found, then it applies Biome’s defaults. If both biome.json and biome.jsonc are present in the same folder, the priority will be given to biome.json.

Here’s an example:

    Directory

app

    Directory

backend

biome.json

    package.json

Directory
frontend

biome.json
Directory
legacy

    package.json

Directory
new

                package.json

    Biome commands that run in app/backend/package.json will use the configuration file app/backend/biome.json;
    Biome commands that run in app/frontend/legacy/package.json and app/frontend/new/package.json will use the configuration file app/frontend/biome.json;

Caution

Biome doesn’t support nested biome.json files, neither in CLI nor in LSP. Follow and help the support in the related issue

Note

Biome commands support using the --config-path option and the BIOME_CONFIG_PATH environment variable. This allows you to specify a custom configuration file or a directory where Biome can look for a biome.json or biome.jsonc file. When you use --config-path or BIOME_CONFIG_PATH, the standard configuration file resolution process is disabled.

If --config-path or BIOME_CONFIG_PATH points directly to a file, you can use names other than biome.json or biome.jsonc. Biome will read a .json file using a standard JSON parser. For files with other extensions, Biome will treat them as .jsonc files, using a more flexible JSON parser that allows comments and trailing commas.
Share a configuration file
Section titled Share a configuration file

The extends field allows you to split your configuration across multiple files. This way, you can share common settings across different projects or folders.

Here’s an example of how you might set up your configuration to extend a common.json configuration file:
biome.json

{
"extends": ["./common.json"]
}

The entries defined in extends are resolved from the path where the biome.json file is defined. They are processed in the order they are listed, with settings in later files overriding earlier ones.

Biome is able to resolve configuration files from the node_modules/ directory. So you can export your configuration file from a package, and import it in multiple projects.

In order to do so, the first thing to do is to set up your “shared” Biome configuration in a certain way. Let’s suppose that you want to share a configuration from a package called @org/shared-configs, using the specifier @org/shared-configs/biome. You have to create an exports entry in the package.json of this package:
package.json

{
"name": "@org/shared-configs",
"type": "module",
"exports": {
"./biome": "./biome.json"
}
}

Make sure that @org/shared-configs is correctly installed in your project, and update the biome.json file to look like the following snippet:
biome.json

{
"extends": ["@org/shared-configs/biome"]
}

Biome will attempt to resolve your library @org/shared-configs/ from your working directory. The working directory is:

    when using the CLI, the directory where you execute your scripts from. Usually it matches the location of your package.json file;
    when using the LSP, the root directory of your project.

Caution

To avoid a breaking change with how the existing resolution works, paths starting with a dot . or ending with .json or .jsonc won’t be resolved from node_modules/.

For more information about the resolution algorithm, refer to the Node.js documentation.
Ignore files
Section titled Ignore files

The first way to control which files and directories are processed by Biome is to list them in the CLI. In the following command, we format only file1.js and all the files in the src directory. The directories are recursively traversed.
Terminal window

biome format file1.js src/

Caution

Glob patterns used on the command line are not interpreted by Biome. They are expanded by your shell. Some shells don’t support the recursive glob \*\*.

The Biome configuration file can be used to refine which files are processed. You can explicitly list the files to be processed using include and the files not to be processed using ignore. include and ignore accepts globs patterns such as src/\*_/_.js. See the related section for which glob syntaxes are supported. include is always applied first before applying ignore. This allows you to include some files and to ignore some of the file you included.

Note

include and ignore have a slightly different semantics. include doesn’t prevent Biome of traversing a folder. This means that if you want to prevent Biome from traversing a folder, you have to add the folder to ignore.

Biome provides global files.include and files.ignore fields that apply to all tools. You can also include and ignore files at tool level using <tool>.include and <tool>.ignore. Note that they don’t override the global files.include and files.ignore. files.include and files.ignore are applied first before a tool’s include and ignore.

Let’s take the following configuration:
biome.json

{
"files": {
"include": ["src/**/*.js", "test/**/*.js"],
"ignore": ["**/*.min.js"],
},
"linter": {
"ignore": ["test"]
}
}

And run the following command:
Terminal window

biome format test/

The command will format the files that end with the .js extension and doesn’t end with the .min.js extension from the test directory. The files in src are not formatted because the directory is not listed in the CLI.

If we run the following command, no files are linted because the test directory is explicitly ignored for the linter.
Terminal window

biome lint test/

Biome resolves the globs relatively from the working directory. The working directory is the directory where you usually run a CLI command. This means that you have to place particular attention when the configuration file is placed in a different directory from where you execute your command. In the case of an editor (LSP) the working directory is the root directory of your project.

Let’s take a project that contains two directories backend/ and frontend/, and the Biome configuration file that we introduced earlier. Inside the frontend/ directory, a package.json specifies a format script that runs the Biome formatter.

    Directory

backend

    …

biome.json
Directory
frontend

package.json
Directory
src

    …

Directory

        test
            …

frontend/package.json

{
"name": "frontend-project",
"scripts": {
"format": "biome format --write ./"
}
}

When you run the script format from frontend/package.json, the working directory resolved by that script will be frontend/. The globs src/**/\*.js and test/**/\*.js will have as “base” directory frontend/. Thus, only the files from frontend/src/ and frontend/test/ will be formatted.
biome.json

{
"files": {
"include": ["src/**/*.js", "src/**/*.ts"],
"ignore": ["test"]
},
"formatter": {
"indentStyle": "space"
}
}

Caution

ignore and include inside overrides have a different semantics:

    for ignore: if a file matches the globs, don’t apply the configuration inside this override, and keep apply the next overrides;
    for include: if a file matches the globs, apply the configuration inside this override, and keep apply the next overrides;

Note

By default, Biome always ignores some files that are said to be protected files. This means that no diagnostics will be ever emitted by Biome for those files. At the moment, the following files are protected:

    composer.lock
    npm-shrinkwrap.json
    package-lock.json
    yarn.lock

Note

You can also ignore files ignored by your VCS.
Well-known files
Section titled Well-known files

Here are some well-known files that we specifically treat based on their file names, rather than their extensions. Currently, the well-known files are JSON-like files only, but we may broaden the list to include other types when we support new parsers.

The following files are parsed as JSON files with both the options json.parser.allowComments and json.parser.allowTrailingCommas set to false.

    .all-contributorsrc
    .arcconfig
    .auto-changelog
    .bowerrc
    .c8rc
    .htmlhintrc
    .imgbotconfig
    .jslintrc
    .nycrc
    .tern-config
    .tern-project
    .vuerc
    .watchmanconfig
    mcmod.info

The following files are parsed as JSON files with the options json.parser.allowComments set to true but json.parser.allowTrailingCommas set to false. This is because the tools consuming these files can only strip comments.

    .ember-cli
    .eslintrc.json
    .jscsrc
    .jshintrc
    tslint.json
    turbo.json

The following files are parsed as JSON files with the options json.parser.allowComments and json.parser.allowTrailingCommas set to true. This is because the tools consuming these files are designed to accommodate such settings.

    .babelrc
    .babelrc.json
    .devcontainer.json
    .hintrc
    .hintrc.json
    .swcrc
    api-documenter.json
    api-extractor.json
    babel.config.json
    deno.json
    devcontainer.json
    dprint.json
    jsconfig.json
    jsr.json
    language-configuration.json
    tsconfig.json
    typedoc.json
    typescript.json

Glob syntax explained
Section titled Glob syntax explained

A glob pattern specifies a set of filenames. Biome supports the following globs:

    * matches zero or more characters. It cannot match the path separator /.
    ** recursively matches directories and files. This sequence must form a single path component, so both **a and b** are invalid and will result in an error. A sequence of more than two consecutive * characters is also invalid.
    [...] matches any character inside the brackets. Ranges of characters can also be specified, as ordered by Unicode, so e.g. [0-9] specifies any character between 0 and 9 inclusive.
    [!...] is the negation of [...], i.e. it matches any characters not in the brackets.

Some examples:

    dist/** matches the dist directory and all files in this directory.
    **/test/** matches all files under any directory named test, regardless of where they are. E.g. dist/test, src/test.
    **/*.js matches all files ending with the extension .js in all directories.

Biome uses a glob library that treats all globs as having a **/ prefix. This means that src/**/_.js and **/src/**/_.js are treated as identical. They match both src/file.js and test/src/file.js.
