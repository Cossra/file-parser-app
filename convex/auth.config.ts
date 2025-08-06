const authConfig = {
  providers: [
    {
      domain: process.env.CLERK_JWT_ISSUER_DOMAIN!,
      applicationID: "convex", // Match your Clerk JWT template name
    },
  ],
};

export default authConfig;

