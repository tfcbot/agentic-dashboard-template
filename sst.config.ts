/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "agentic-dashboard",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
      providers: {
        cloudflare: {
          version: "5.45.0",
          apiToken: process.env.CLOUDFLARE_API_TOKEN,
        }
      },
    };
  },
  async run() {
    const clerkSignInUrl = new sst.Secret("clerkSignInUrl");
    const clerkSignUpUrl = new sst.Secret("clerkSignUpUrl");
    const clerkPublishableKey = new sst.Secret("clerkPublishableKey");
    const clerkSecretKey = new sst.Secret("clerkSecretKey");
    const stripePublishableKey = new sst.Secret("stripePublishableKey");
    const subscriptionManagementUrl = new sst.Secret("subscriptionManagementUrl");
    
    const baseDomain = process.env.BASE_DOMAIN;
    if (!baseDomain) {
      throw new Error("BASE_DOMAIN environment variable is required");
    }
    const domainName = $app.stage === "production"
      ? `app.${baseDomain}`
      : `${$app.stage}-app.${baseDomain}`;
   
    const apiDomainName = $app.stage === "production"
      ? `api.${baseDomain}`
      : `${$app.stage}-api.${baseDomain}`;

    const web = new sst.aws.Nextjs("MyWeb", {
      domain: {
        name: domainName,
        dns: sst.cloudflare.dns({
          transform: {
            record: (record) => {
              if (record.name === domainName && record.type !== "CAA") {
                record.proxied = true;
                record.ttl = 1;
              }
            },
          },
        }),
      },
      environment: {
        NEXT_PUBLIC_CLERK_SIGN_IN_URL: clerkSignInUrl.value,
        NEXT_PUBLIC_CLERK_SIGN_UP_URL: clerkSignUpUrl.value,
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: clerkPublishableKey.value,
        NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: stripePublishableKey.value,
        CLERK_SECRET_KEY: clerkSecretKey.value,
        NEXT_API_URL: `https://${apiDomainName}/v1`,
        NEXT_SUBSCRIPTION_MANAGEMENT_URL: subscriptionManagementUrl.value,
      },
    });
  },
  console: {
    autodeploy: {
      target(event) {
        if (event.type === "branch" && event.action === "pushed") {
          switch (event.branch) {
            case "development":
              return {
                stage: "dev",
                runner: { engine: "codebuild", compute: "large" }
              };
            case "staging":
              return {
                stage: "staging",
                runner: { engine: "codebuild", compute: "large" }
              };
            case "main":
              return {
                stage: "prod",
                runner: { engine: "codebuild", compute: "large" }
              };
            default:
              console.log(`Not a standard branch: ${event.branch}`);
              return {
                stage: event.branch
              }
          }
        }
      }
    }
  },
});
