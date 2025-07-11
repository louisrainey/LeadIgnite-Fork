Source Code Analysis Tools
Contributor(s): Dave Wichers, itamarlavender, will-obrien, Eitan Worcel, Prabhu Subramanian, kingthorin, coadaflorin, hblankenship, GovorovViva64, pfhorman, GouveaHeitor, Clint Gibler, DSotnikov, Ajin Abraham, Noam Rathaus, Mike Jang

Source code analysis tools, also known as Static Application Security Testing (SAST) Tools, can help analyze source code or compiled versions of code to help find security flaws.

SAST tools can be added into your IDE. Such tools can help you detect issues during software development. SAST tool feedback can save time and effort, especially when compared to finding vulnerabilities later in the development cycle.
Strengths and Weaknesses
Strengths

    Scales well – can be run on lots of software, and can be run repeatedly (as with nightly builds or continuous integration).
    Identifies certain well-known vulnerabilities, such as:
        Buffer overflows
        SQL injection flaws
    Output helps developers, as SAST tools highlight the problematic code, by filename, location, line number, and even the affected code snippet.

Weaknesses

    Difficult to automate searches for many types of security vulnerabilities, including:
        Authentication problems
        Access control issues
        Insecure use of cryptography
    Current SAST tools are limited. They can automatically identify only a relatively small percentage of application security flaws.
    High numbers of false positives.
    Frequently unable to find configuration issues, since they are not represented in the code.
    Difficult to ‘prove’ that an identified security issue is an actual vulnerability.
    Many SAST tools have difficulty analyzing code that can’t be compiled.
        Analysts frequently cannot compile code unless they have:
            Correct libraries
            Compilation instructions
            All required code

Important Selection Criteria

    Prerequisite: Support your programming language.
    Ability to detect vulnerabilities, based on:
        The OWASP Top Ten
        Other criteria such as:
            OSSTMM
            CHECK
    Accuracy:
        False Positive/False Negative rates
        OWASP Benchmark score
    Ability to understand the libraries/frameworks you need
    Requirement for buildable source code
    Ability to run against binaries (instead of source)
    Availability as a plugin into preferred developer IDEs
    Ease of setup/use
    Ability to include in Continuous Integration/Deployment tools
    License cost (May vary by user, organization, app, or lines of code)
    Interoperability of output:
        See OASIS SARIF (Static Analysis Results Interchange Format)

Disclaimer

The tools listed in the tables below are presented in alphabetical order. OWASP does not endorse any of the vendors or tools by listing them in the table below. We have made every effort to provide this information as accurately as possible. If you are the vendor of a tool below and think that this information is incomplete or incorrect, please send an e-mail to our mailing list and we will make every effort to correct this information.
Name/Link Owner License Platforms Note
.NET Code analysis Open Source or Free .NET, successor of Microsoft FxCop
42Crunch Commercial REST API security platform that includes Security Audit (SAST), dynamic conformance scan, runtime protection, and monitoring.
ABOM Scanner Vulert Free SaaS ABOM is an online SCA ( software composition analysis ) tool that scans your application for open-source vulnerabilities using only a manifest file. Covering PHP, JavaScript, Rust, Python, and other top languages.
Agentic Radar SplxAI Free Windows, Linux, MacOS Open-source CLI security scanner for agentic AI workflows. Scans your workflow’s source code, detects vulnerabilities, and generates an interactive visualization along with a detailed security report. Supports popular agentic frameworks like LangGraph, CrewAI, n8n, OpenAI Agents, and more.
Aikido SAST Aikido Security Commercial or Free SaaS, On-Premises Aikido Security is a developer-friendly software security platform that combines multiple different scanners to deliver real-time alerts in a central system
Anchore Enterprise Anchore Inc. Commercial Docker, AWS, Kubernetes, Azure, GCP An SBOM-powered platform that protects and secures your software supply chain end-to-end. Free trial available.
APIsecurity.io Security Audit Open Source or Free online tool for OpenAPI / Swagger file static security analysis
AppSweep Guardsquare Open Source or Free SaaS Mobile application security testing tool for compiled Android apps with support of CI/CD integration
Arnica Arnica.io Commercial or Free SaaS Arnica is an end to end security solution that includes SAST, SCA, IaC, Licensing, Reputation, Hardcoded Secrets Mitigation, Permissions and more. Arnica's pipelineless approach empowers developers through automated mitigations and real time feedback.
Automated Security Helper AWS Open Source or Free ASH is a one stop shop for security scanners, and does not require any installation. It will identify the different frameworks, and download the relevant, up to date tools. ASH is running on isolated Docker containers, keeping the user environment clean, with a single aggregated report. The following frameworks are supported: Git, Python, Javascript, Cloudformation, Terraform and Jupyter.
Bandit Open Source or Free Bandit is a comprehensive source vulnerability scanner for Python
Bearer CLI Bearer Open Source or Free CLI on Windows, MacOS, Linux, Docker, CI/CD integration Static Application Security Testing (SAST) to discover, filter and prioritize security and privacy risks using sensitive data flow analysis. Currently supports Java, Ruby, JavaScript and TypeScript.
Betterscan CE (Community Edition) Marcin Kozlowski Open Source Code Scanning/SAST/Static Analysis/Linting using many tools/Scanners with One Report. Currently supports: PHP, Java, Scala, Python, Ruby, Javascript, GO, Secret Scanning, Dependency Confusion, Trojan Source, Open Source and Proprietary Checks (total ca. 1000 checks). Supports also Differential analysis. Goal is to have one report using many tools/scanners
Beyond Security beSOURCE Beyond Security Commercial Static application security testing (SAST) used to be divorced from Code quality reviews, resulting in limited impact and value. beSOURCE addresses the code security quality of applications and thus integrates SecOps into DevOps.
BlueClosure BC Detect BlueClosure Commercial Analyzes client-side JavaScript.
Brakeman Open Source or Free Brakeman is an open source vulnerability scanner specifically designed for Ruby on Rails applications
bugScout Nalbatech, Formerly Buguroo Commercial
CAST AIP Commercial Performs static and architectural analysis to identify numerous types of security issues. Supports over 30 languages. [AIP's security specific coverage is here](https://www.castsoftware.com/solutions/application-security/cwe#SupportedSecurityStandards).
clj-holmes clj-holmes Open Source Linux and MacOs A CLI SAST (Static application security testing) tool which was built with the intent of finding vulnerable Clojure code via rules that use a simple pattern language.
CloudDefense CloudDefense Commercial SaaS or On-Premises CloudDefense provides holistic threat intelligence across all attack surfaces - Containers, Kubernetes, Code, Open Source Libraries, APIs and more...
Codacy Commercial Offers security patterns for languages such as Python, Ruby, Scala, Java, JavaScript and more. Integrates with tools such as Brakeman, Bandit, FindBugs, and others. (free for open source projects)
CodeScan Cloud Commercial A Salesforce focused, SaaS code quality tool leveraging SonarQube's OWASP security hotspots to give security visibility on Apex, Visualforce, and Lightning proprietary languages.
CodeSonar CodeSecure Commercial CodeSonar is a static code analysis solution that helps you find and understand quality and security defects in your source code or binaries. It supports C/C++, Java, C#, Kotlin, Python, Go, Rust, JavaScript, and TypScript.
CodeThreat CodeThreat Commercial or Free SaaS or On-Premises Developer-friendly SAST and SCA solutions, Integration with CI/CD pipelines complements a robust DevSecOps strategy, and AI-powered features provide actionable insights with code fix suggestions and potential attack scenarios, helping developers remediate identified issues promptly.
Codiga Codiga Commercial SaaS or On-Premises Codiga scans your code and find security, safety, design, performance and maintainability issues in your code at each push or pull request. It integrates with GitHub, GitLab and Bitbucket.
CoGuard Heinle Solutions Inc. Commercial SaaS or On-Premises A SAST tool for infrastructure configuration analysis. Support for common web servers, databases, streaming services, authentication services, container orchestration and Infrastructure-as-Code tools.
Contrast Assess Commercial Contrast performs code security without actually doing static analysis. Contrast does Interactive Application Security Testing (IAST), correlating runtime code & data analysis. It provides code level results without actually relying on static analysis.
Coverity Static Analysis Synopsys Commercial Apex, C/C++, C#, CUDA, Java#, JavaScript, PHP, Python, .NET Core, ASP.NET, Objective-C, Go, JSP, Ruby, Swift, Fortran, Scala, VB.NET, iOS, Android, TypeScript, Kotlin
CxSAST Checkmarx Commercial Saas, or on-premises. Windows and Linux with CI/CD and IDE plugin integration Run full or incremental source code security scans. Supported languages include Javascript, Java, Apex, PHP, Python, Swift, Scala, Perl, Groovy, Ruby, C++, C#.NET, PL/SQL, VB.NET, ASP.NET, HTML 5, Windows Mobile, Go, and Kotlin.
Cycode | Complete ASPM Commercial SaaS, On-Premises, IDE Plugin Cycode is a complete ASPM that also has its own native scanners tools from code to cloud, including native SAST and native SCA scanners.
Dawnscanner Open Source or Free Dawnscanner is an open source security source code analyzer for Ruby, supporting major MVC frameworks like Ruby on Rails, Padrino, and Sinatra. It also works on non-web applications written in Ruby.
DeepSource DeepSource Corp. Commercial SaaS or On-Premises DeepSource helps companies ship clean and secure code with powerful static analysis, OWASP Top 10 compliance, and Autofix. Supports all major programming languages.
DerScanner DerScanner Ltd. Commercial Capable of identifying vulnerabilities and backdoors (undocumented features) in over 30 programming languages by analyzing source code or executables, without requiring debug info.
Enlightn Enlightn Software Open Source Enlightn is a vulnerability scanner specifically designed for Laravel PHP applications that combines SAST, DAST, IAST and configuration analysis techniques to detect vulnerabilities.
Find Security Bugs Open Source or Free Java, Scala, Groovy
FindBugs Open Source or Free Find bugs (including a few security flaws) in Java programs [Legacy - NOT Maintained - Use SpotBugs (see other entry) instead]
FindSecBugs Open Source or Free A security specific plugin for SpotBugs that significantly improves SpotBugs's ability to find security vulnerabilities in Java programs. Works with the old FindBugs too.
Flawfinder Open Source or Free Scans C and C++.
Fluid Attack's Scanner Fluid Attacks Open Source SAST, DAST and SCA vulnerability detection tool with perfect OWASP Benchmark score.
Fortify Micro Focus Commercial Windows, Linux, and MacOSX Free trial scan available. Supported languages include: ABAP/BSP, ActionScript/MXML (Flex), APEX, ASP.NET, VB.NET, C\# (.NET), C/C++, Classic ASP (w/VBScript), COBOL, ColdFusion CFML, Go, HTML, Java (including Android), JavaScript/AJAX, JSP, Kotlin, Objective-C, PHP, PL/SQL, Python, Typescript, T-SQL, Ruby, Scala, Swift, Visual Basic (VB.NET), Visual Basic 6, VBScript, XML
GitGuardian — Automated Secrets Detection Commercial SaaS or On-Premises Secure your software development with automated secrets detection & remediation for private or public source code.
GitHub Advanced Security GitHub Open Source or Free SaaS or On-Premises GitHub Advanced Security uses CodeQL for Static Code Analysis, and GitHub Secret Scanning for identifying tokens. GitHub code scanning can import SARIF from any other SAST tool
GitLab GitLab Commercial SaaS, Linux, Windows
GolangCI-Lint Open Source or Free A Go Linters aggregator - One of the Linters is [gosec (Go Security)](https://github.com/securego/gosec), which is off by default but can easily be enabled.
Google CodeSearchDiggity Open Source or Free Uses Google Code Search to identify vulnerabilities in open source code projects hosted by Google Code, MS CodePlex, SourceForge, Github, and more. The tool comes with over 130 default searches that identify SQL injection, cross-site scripting (XSS), insecure remote and local file includes, hard-coded passwords, and much more. _Essentially, Google CodeSearchDiggity provides a source code security analysis of nearly every single open source code project in existence – simultaneously._
Graudit Open Source or Free Linux Scans multiple languages for various security flaws. Basically security enhanced code Grep.
Grype Anchore Inc. Open Source Linux, MacOS, Windows A vulnerability scanner for container images and filesystems.
HCL AppScan CodeSweep - GitHub Action HCL Software Open Source or Free Scan the new code on a push/pull request using a GitHub action. Findings are highlighted in the `Files Changed` view and details about the issue and mitigation steps can be found in the `Actions` page. Unrestricted usage allowed with a free trial account. The tool currently supports Python, Ruby, JS (Vue, React, Node, Angular, JQuery, etc), PHP, Perl, COBOL, APEX & a few more.
HCL AppScan CodeSweep - IDE HCL Software Open Source or Free This is the first Community edition version of AppScan. It is delivered as a VS Code [https://hclsw.co/codesweep] and JetBrains [https://hclsw.co/codesweep-jetbrains] (IntelliJ IDEA, CLion, GoLand, PhpStorm, PyCharm , Rider, RubyMine, WebStorm) plugin and scans files upon saving them. The results show the location of a finding, type and remediation advice. The tool currently supports Java, .Net, Go, Python, Ruby, JS (Node, Angular, JQuery, etc) , PHP, Perl, COBOL, APEX & a few more. Auto-fix for some of the issues is available with a free trial.
HCL AppScan on Cloud HCL Software Open Source or Free Apex, ASP, C, C++, COBOL, ColdFusion, Go, Java, JavaScript(Client-side JavaScript, Kotlin, NodeJS, and AngularJS), .NET (C#, ASP.NET, VB.NET), .NET Core, Perl, PHP, PL/SQL, Python, Ruby, T-SQL, Swift, Visual Basic 6
HCL AppScan Source HCL Software Commercial Android, Apex, ASP, C, C++, COBOL, ColdFusion, Go, Java, JavaScript(Client-side JavaScript, NodeJS, and AngularJS), .NET (C#, ASP.NET, VB.NET), .NET Core, Perl, PHP, PL/SQL, Python, Ruby, T-SQL, Visual Basic 6
Hdiv Detection Hdiv Security Commercial Hdiv performs code security without actually doing static analysis. Hdiv does Interactive Application Security Testing (IAST), correlating runtime code & data analysis. It provides code-level results without actually relying on static analysis.
Horusec Open Source or Free C#, Java, Kotlin, Python, Ruby, Golang, Terraform, Javascript, Typescript, Kubernetes, PHP, C, HTML, JSON, Dart, Elixir, Shell, Nginx, Swift
HuskyCI Open Source or Free HuskyCI is an open-source tool that orchestrates security tests inside CI pipelines of multiple projects and centralizes all results into a database for further analysis and metrics. HuskyCI can perform static security analysis in Python (Bandit and Safety), Ruby (Brakeman), JavaScript (Npm Audit and Yarn Audit), Golang (Gosec), and Java(SpotBugs plus Find Sec Bugs)
Insider CLI InsiderSec Open Source or Free A open source Static Application Security Testing tool (SAST) written in GoLang for Java Maven and Android), Kotlin (Android), Swift (iOS), .NET Full Framework, C#, and Javascript (Node.js).
joern joernio Open Source or Free Scans C/C++/Java/Binary/Javascript/Python/Kotlin/JVM Bytecode/PHP/Go/Ruby/Swift/C#.
Kiuwan a division of Idera, Inc. Commercial provides an application security testing and analytics platform – including SAST and SCA solutions – that reduces risk and improves change management and DevOps processes
Klocwork Perforce Commercial Static Code Analysis for C, C++, C#, Java, JavaScript, Python, Kotlin
L3X VulnPlanet Open Source or Free GitHub L3X detects vulnerabilities in Rust and Solidity code based on patterns and AI code analysis. Various LLMs act as validators for vulnerabilities detected by patterns and validate each others' results in AI code analysis. Vulnerabilities are confirmed when they receive confirmation from a majority of validators.
LeapFix Fernando Mengali, Leap Free VSCode It is a Visual Studio IDE plugin for static code vulnerability analysis (SAST) finding flaws with high precision and depth in 9 languages
Lucent Sky AVM Lucent Sky Commercial SaaS or On-Premises Automatically finds and fixes application vulnerabilities in source code. Supports .NET, ASP, Android, C and C++, ECMAScript, Go, iOS, Java, PHP, Pytohn, Ruby, and Visual Basic applications.
LunaTrace by LunaSec LunaSec Open Source or Free SaaS or On-Premises Software Composition Analysis (SCA) tool to generate SBOMs, identify vulnerabilities in dependencies, and generate patches. Leverages Static Analysis to reduce false positives by filtering non-exploitable CVEs.
Mend SAST Mend Commercial Static security analysis for 27+ languages.
Microsoft PREFast Open Source or Free C, C++
MobSF Open Source or Free Mobile Security Framework (MobSF) is an automated, all-in-one mobile application (Android/iOS/Windows) pen-testing, malware analysis and security assessment framework capable of performing static and dynamic analysis.
MobSF Open Source or Free Windows, Unix Android Java, Objective C, Swift
NaiveSystems Analyze Naive Systems Ltd. Open Source or Free Windows, MacOS and Linux NaiveSystems Analyze ensures compliance with functional safety and coding standards including MISRA, AUTOSAR, and Google C++ Style Guide. Supports C, C++, Java, and more languages.
nancy Sonatype Open Source Community Open Source or Free Scans for Golang dependencies
NextGen Static Analysis ShiftLeft Commercial SaaS Free version available. Currently supports Java, JavaScript, C\#, TypeScript, Python, and Terraform. Create your free account at https://shiftleft.io/register.
nodejsscan Open Source or Free Unix Node.js
Nucleaus Core Nucleaus Commercial SaaS Scans Git repos daily and provides a web-based dashboard to track code and dependency vulnerabilities. Handles team-based access patterns, vulnerability exception lifecycle, and is built on API first principles.
Offensive360 Commercial SAST technology that attacks the source code from all corners it has all in one. Malware, SCA, License, and deep source code analysis.
Oversecured Oversecured Inc Commercial iOS, Android Enterprise vulnerability scanner for Android and iOS apps. It offers app owners and developers the ability to secure each new version of a mobile app by integrating Oversecured into the development process.
OWASP ASST (Automated Software Security Toolkit) Tarik Seyceri & OWASP Open Source or Free Ubuntu, MacOSX and Windows An Open Source, Source Code Scanning Tool, developed with JavaScript (Node.js framework), Scans for PHP & MySQL Security Vulnerabilities According to OWASP Top 10 and Some other OWASP's famous vulnerabilities, and it teaches developers of how to secure their codes after scan.
OWASP IDE VulScanner DestinJiDee LTD Free IntelliJ, VSCode The product falls under the SCA tool category and enables developers to scan third-party dependencies within their favourite IDEs i.e. IntelliJ and VSCode.
ParaSoft Open Source or Free C, C++, Java, .NET
Parasoft Test Parasoft Commercial Test tools for C/C++, .NET, Java
parse psecio Open Source or Free Scans PHP
phpcs-security-audit Open Source or Free A set of PHP_CodeSniffer rules to finds flaws or weaknesses related to security in PHP and its popular CMS or frameworks. It currently has core PHP rules as well as Drupal 7 specific rules.
PHPStan Open Source or Free PHP Static Analysis Tool
PITSS.CON PITTS Commercial Scans Oracle Forms and Reports Applications
Pixeebot Pixee Commercial or Free GitHub Pixeebot finds security and code quality issues in your code and creates merge-ready pull requests with recommended fixes.
PMD Open Source or Free PMD scans Java source code and looks for potential code problems (this is a code quality tool that does not focus on security issues).
Polyspace Static Analysis Tools Commercial C, C++, Ada
PreFast Microsoft Open Source or Free PREfast is a static analysis tool that identifies defects in C/C++ programs. Last update 2006.
Progpilot Open Source or Free Progpilot is a static analyzer tool for PHP that detects security vulnerabilities such as XSS and SQL Injection.
Psalm Vimeo, Inc. Open Source Static code analysis for PHP projects, written in PHP.
PT Application Inspector Positive Technologies Commercial Combines SAST, DAST, IAST, SCA, configuration analysis and other technologies for high accuracy. Can generate special test queries (exploits) to verify detected vulnerabilities during SAST analysis. Supports Java, C\#, PHP, JavaScript, Objective C, VB.Net, PL/SQL, T-SQL, and others.
Puma Scan Puma Security Commercial A .NET C\# static source code analyzer that runs as a Visual Studio IDE extension, Azure DevOps extension, and Command Line (CLI) executable.
Puma Scan Professional Open Source or Free .NET, C\#
PVS-Studio Open Source or Free C, C++, C\#
PVS-Studio Analyzer PVS-Studio Commercial Static code security analysis for C, C++, C#, and Java. A commercial B2B solution, but provides several free [licensing options](https://www.viva64.com/en/b/0614/).
Pyre Open Source or Free A performant type-checker for Python 3, that also has [limited security/data flow analysis](https://pyre-check.org/docs/pysa-basics.html) capabilities.
reshift Commercial A CI/CD static code security analysis tool for Java that uses machine learning to give a prediction on false positives.
SecureAssist Synopsys Commercial Scans code for insecure coding and configurations automatically as an IDE plugin for Eclipse, IntelliJ, and Visual Studio, etc. Supports Java, .NET, PHP, and JavaScript.
Seeker Synopsys Commercial Seeker performs code security without actually doing static analysis. Seeker does Interactive Application Security Testing (IAST), correlating runtime code & data analysis with simulated attacks. It provides code level results without actually relying on static analysis.
Semgrep Open Source or Free Semgrep is a fast, open-source, static analysis engine for finding bugs, detecting vulnerabilities in third-party dependencies, and enforcing code standards. Semgrep analyzes code locally on your computer or in your build environment: code is never uploaded.
Semgrep Supply Chain Commercial Semgrep Supply Chain’s reachability analysis lets you quickly find and remediate the 2% of dependency vulnerabilities that are actually reachable.
Sentinel Source Whitehat Commercial Static security analysis for 10+ languages.
ShiftLeft Scan Open Source or Free A free open-source DevSecOps platform for detecting security issues in source ode and dependencies. It supports a broad range of languages and CI/CD pipelines by bundling various open source scanners into the pipeline.
Snyk Cloud Snyk Limited Commercial or Free SaaS, IDE Plugin Detects cloud security issues as soon as developers start designing configurations, providing expert guidance to cloud, platform, and security teams in the tools and workflows they use every day.
Snyk Code Snyk Limited Commercial or Free SaaS, IDE Plugin AI-powered code checker that analyzes your code for security issues, providing actionable advice directly from your IDE to help you fix vulnerabilities quickly
Snyk Container Snyk Limited Commercial or Free SaaS, IDE Plugin Container and Kubernetes security that helps developers and DevOps find and fix vulnerabilities throughout the SDLC.
Snyk IaC Snyk Limited Commercial or Free SaaS, IDE Plugin Reduce risk by automating Infrastructure as Code (IaC) security and compliance in development workflows pre-deployment and detecting drifted and missing resources post-deployment.
Snyk Open Source Snyk Limited Commercial or Free SaaS, IDE Plugin Software composition analysis (SCA) solution helping developers find, prioritize, and fix security vulnerabilities and license issues in open source dependencies.
sobelow nccgroup Open Source or Free Scans for Phoenix Framework
SonarCloud Open Source or Free ABAP, C, C++, Objective-C, COBOL, C\#, CSS, Flex, Go, HTML, Java, Javascript, Kotlin, PHP, PL/I, PL/SQL, Python, RPG, Ruby, Swift, T-SQL, TypeScript, VB6, VB, XML
SonarQube Open Source or Free Scans source code for 15 languages for Bugs, Vulnerabilities, and Code Smells. SonarQube IDE plugins for Eclipse, Visual Studio, and IntelliJ provided by [SonarLint](https://www.sonarlint.org/).
Spectral SpectralOps Open Source or Free Multi-platform & Multi-architecture. Linux/Windows/MacOSx/\*nix. Programming-language agnostic Discover, classify, and protect your codebases, logs, and other assets. Monitor and detect API keys, tokens, credentials, high-risk security misconfiguration and more.
Splint Open Source or Free C
SpotBugs Open Source or Free Java. This is the active fork replacement for FindBugs, which is not maintained anymore. Very little security. FindSecBugs plugin provides security rules.
Static application security testing Online MUNSIRADO Commercial or Free SaaS Examine the Android Source code to identify any security issues or vulnerabilities.
Static Reviewer Security Reviewer Commercial Windows and Linux; on-Premises and in Cloud; Desktop, CLI and CI/CD & IDE plugin integration Static Reviewer executes code checks according to the most relevant Secure Coding Standards for 40+ programming languages, using 1000+ built-in validation rules.
Syft Anchore Inc. Open Source Linux, MacOS, Windows CLI tool and library for generating a Software Bill of Materials from container images and filesystems.
talisman Thoughtworks Free MAC OSX, Linux and Windows Scans git changesets
Understand SciTools Commercial Windows, MacOSX, Linux IDE that provides static code analysis using graphs, documentation, and metrics. Scans code to check for vulnerabilities and ensures compliance with standards like MISRA and AUTOSAR. Works with 20 languages including C, C++, C#, JavaScript, Python, and Java.
Veracode Open Source or Free Android, ASP.NET, C\#, C, C++, Classic ASP, COBOL, ColdFusion/Java, Go, Groovy, iOS, Java, JavaScript, Perl, PhoneGap/Cordova, PHP, Python, React Native, RPG, Ruby on Rails, Scala, Titanium, TypeScript, VB.NET, Visual Basic 6, Xamarin
Veracode Static Analysis Veracode Commercial
VisualCodeGrepper (VCG) Open Source or Free Scans C/C++, C\#, VB, PHP, Java, PL/SQL, and COBOL for security issues and for comments which may indicate defective code. The config files can be used to carry out additional checks for banned functions or functions which commonly cause security issues.
VS Code OpenAPI (Swagger) Editor extension Open Source or Free Plugin to Microsoft Visual Studio Code that enables rich editing capabilities for REST API contracts and also includes linting and Security Audit (static security analysis).
Vulert Vulert Commercial or Free SaaS An SCA solution that seamlessly monitors applications for open-source vulnerabilities without code access or installations, delivering real-time alerts.
ZeroPath ZeroPath Commercial or Free SaaS, On-Premises Scans over 10 languages to identify and fix conventional technical vulnerabilities (e.g., XSS, SQL injection, SSRF) as well as business logic flaws and auth bugs.
