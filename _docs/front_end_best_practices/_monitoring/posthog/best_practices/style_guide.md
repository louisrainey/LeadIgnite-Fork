Style guide

Last updated: Dec 20, 2024
|
Edit this page

This style guide explains our guidelines for contributions to PostHog's documentation, tutorials, and blog.
General principles
Assume almost nothing

As you gain mastery of a product or feature, some things become second nature, but remember they weren't always so obvious. Call these out, and provide links to relevant docs or websites.

Make it easy for your reader to implement their feature or solve their issue, whether they are an expert or just starting out with PostHog.
Avoid hedging

We are opinionated at PostHog. That means avoiding hedging like saying "it's complicated" or "it depends." This is frustrating for the reader and doesn't add value. Instead:

    Have an opinion.
    Provide an example.
    Do the research until you can do 1. or 2.

Avoid overly long intros

Most articles can be improved by making the intro shorter and more direct. Two short paragraphs, or less, is preferable, though there will always be exceptions.
Brand guidelines
We're an analytics platform, not a product analytics tool

Unless directly referring to our product analytics suite, substitute references to "product analytics" or "product analytics tool" with the phrase "analytics platform".

    Example: “A data warehouse or product analytics tool like PostHog can be helpful here.” would become “A data warehouse or analytics platform like PostHog can be helpful here.

Product OS is also an acceptable alternative – use your judgement based on the context.
Do not capitalize product features

It's "product analytics" not "Product Analytics" and so on.
Style rules
Use American English

PostHog is a global company. Our team and our customers are distributed around the world. For consistency, we use American English spelling and grammar.
Use the Oxford comma

Write "bananas, apples, and oranges", not "bananas, apples and oranges".

Why does this matter? Consider the old joke:

"There are two hard problems in computer science: naming things, cache invalidation, and off by one errors."

That doesn't work without the Oxford.
Use British-style en dashes

While we default to American English in most things, we prefer using the British-style en dash ( – ) with a space either side rather than the longer em dash with no spaces (—) used in American English.

    Example: "Don’t up vote your own content, and don’t ask other people to – post it and pray."

Please don't use a hyphen instead of en dash. On Macs, holding down Option and the hyphen key will give you an en dash.
Use "enable", not "allow"

Allow is another way of saying permit.

    Example: Your partner allows you to stay up late and play video games.

Enable means providing the means or opportunity.

    Example: PostHog enables you to understand user behavior.

In most cases, PostHog enables users to do things.
Add extra line breaks between long bullet points

Sections with long bullet point items are hard to read without extra line breaks (when looking at Markdown). For example, this passage:

        Feature flags: PostHog offers robust, multivariate feature flags which support JSON payloads. This enables you to push real-time changes to your product without needing to redeploy. Visit our feature flag page for more information. LogRocket doesn’t have any in-built feature flag functions.
        Experiments: PostHog offers multivariate experimentation, which enables you to test changes and discover statistically relevant insights. Visit the experimentation page for more information. LogRocket doesn’t have any in-built experimentation features.
        Open source: PostHog is entirely open source, under a permissive MIT license. The biggest advantage for users is the ability to build on top of PostHog and to access the source code directly. Our team also works in the open. LogRocket is not an open source company, nor is the product available under an open source license.

Is harder to read than this passage:

        Feature flags: PostHog offers robust, multivariate feature flags which support JSON payloads. This enables you to push real-time changes to your product without needing to redeploy. Visit our feature flag page for more information. LogRocket doesn’t have any in-built feature flag functions.

        Experiments: PostHog offers multivariate experimentation, which enables you to test changes and discover statistically relevant insights. Visit the experimentation page for more information. LogRocket doesn’t have any in-built experimentation features.

        Open source: PostHog is entirely open source, under a permissive MIT license. The biggest advantage for users is the ability to build on top of PostHog and to access the source code directly. Our team also works in the open. LogRocket is not an open source company, nor is the product available under an open source license.

This isn't necessary for shorter bullet point lists.
Use straight apostrophes and quote marks

Many writing tools, such as Google Docs, Notion and Word, add curly quotes and apostrophes. Please avoid using these. They can normally be turned off in the settings.
Capitalize proper names as appropriate

Write "Redis server", not "redis server".
"Open source" vs "open-source"

Both can be correct depending on usage.

Open source should be hyphenated when it appears before a noun.

    Example: "The open-source community is awesome"

But should be written without a hyphen in other contexts.

    Example: "PostHog loves being open source."

Capitalize acronyms and define where needed

Write "URLs", not "urls".

Many acronyms, like that one, will be familiar to developers. When in doubt, link the first use of an acronym to a definition, or provide one.
Use sentence case for titles

Write "Documentation style guide", not "Documentation Style Guide".
