Feature flag best practices

Last updated: Apr 01, 2025
|
Edit this page

1. Use a reverse proxy

Ad blockers have the potential to disable your feature flags, which can lead to bad experiences, such as users seeing the wrong version of your app, or missing a new feature rollout.

To avoid this, deploy a reverse proxy, which enables you to make requests and send events to PostHog Cloud using your own domain.

This means that requests are less likely to be intercepted by tracking blockers, and your feature flags are more likely to work as intended. You'll also capture more usage data.

PostHog customers on the Teams add-on can use our managed reverse proxy, but there are numerous methods to run your own. See our reverse proxy docs for more. 2. Call your flag in as few places as possible

It should be easy to understand how feature flags affect your code. The more locations a flag is in, the more likely it is to cause problems. For example, a developer could remove the flag in one place but forget to remove it in another.

If you expect to use a feature flag in multiple places, it's a good idea to wrap the flag in a single function or method. For example:
JavaScript

function useBetaFeature() {
return posthog.isFeatureEnabled('beta-feature')
}

3. Identify users

Because PostHog evaluates flags based on the user's distinct ID, having different IDs can cause the same user to receive different flag values across different sessions, devices, and platforms. By identifying them, you can ensure they consistent flag values.

The same applies to identifying groups for group-level flags. 4. Use server-side local evaluation for faster flags

Evaluating feature flags requires making a request to PostHog for each flag. However, you can improve performance by evaluating flags locally. Instead of making a request for each flag, PostHog will periodically request and store feature flag definitions locally, enabling you to evaluate flags without making additional requests.

Evaluate flags locally when possible, since this enables you to resolve flags faster and with fewer API calls. See our docs on local evaluation for more details. 5. Bootstrap flags on the client to make them available immediately

Since there is a delay between initializing PostHog and fetching feature flags, feature flags are not always available immediately. This makes them unusable if you want to do something like redirecting a user to a different page based on a feature flag.

To have your feature flags available immediately, you can initialize PostHog with precomputed values until it has had a chance to fetch them. This is called bootstrapping.

See our docs on bootstrapping for more details on how to do this. 6. Naming tips

Good naming conventions for your flags makes them easier to understand and maintain. Below are tips for naming your flags:

    Use descriptive names. For example, is_v2_billing_dashboard_enabled is much clearer than is_dashboard_enabled.

    Use name "types". This helps organize them and makes their purpose clear. Types might include experiments, releases, and permissions. For example, instead of new-billing, they would be new-billing-experiment or new-billing-release.

    Name flags to reflect their return type. For example, is_premium_user for a boolean, enabled_integrations for an array, or selected_theme for a single string.

    Use positive language for boolean flags. For example, is_premium_user instead of is_not_premium_user. This helps avoid double negatives when checking the flag value (e.g. if !is_not_premium_user is confusing).

7. Roll out progressively

When testing a change behind a feature flag, it is best to roll it out to a small group of users and increase that group over time. This is also known as a phased rollout. It enables you to identify any potential issues ahead of the full release.

For example, at PostHog we often roll out the flag to just the responsible developer. It then moves on to the internal team, then beta users, and finally into a full rollout. This enables us to test in production, get multiple rounds of feedback, identify issues, and polish the feature before the full release. 8. Clean up after yourself

Leaving flags in your code for too long can confuse future developers and create technical debt, especially if it's already rolled out and integrated. Be sure to remove stale flags once they are completely rolled out or no longer needed. 9. Fallback to working code

It's possible that a feature flag will return an unexpected value. For example, if the flag is disabled or failed to load due to a network error.

In this case, its best to check that the feature flag returns a valid expected value before using it. If it isn't, fallback to working code.
