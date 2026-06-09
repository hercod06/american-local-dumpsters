// Base44 SDK removed — this is now a standalone site.
// This stub keeps backward-compatible imports from breaking if any file
// still references `base44`. It performs no network calls.
export const base44 = {
  auth: {
    me: async () => { throw new Error('Auth disabled in standalone mode'); },
    logout: () => {},
    redirectToLogin: () => {},
  },
  integrations: { Core: {} },
  entities: {},
};
