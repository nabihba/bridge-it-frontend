import { createClient } from '@base44/sdk';
// import { getAccessToken } from '@base44/sdk/utils/auth-utils';

// Create a client with authentication required
export const base44 = createClient({
  appId: "6881ded3fb7df3835a381e77", 
  requiresAuth: true // Ensure authentication is required for all operations
});
