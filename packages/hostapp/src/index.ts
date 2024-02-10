// "Chunk loading operation" needed for Weback modulefederation setup
// This give webpack (when running the app in a browser) some extra time
// to load asynchronously all the dependencies it needs to run this bootstrap.ts file

// Fixes error: Uncaught Error: Shared module is not available for eager consumption

import("./bootstrap");
