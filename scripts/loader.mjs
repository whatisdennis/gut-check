// ESM resolver hook: the @material/material-color-utilities package uses
// extensionless relative imports meant for bundlers. Append .js (or /index.js)
// so Node's strict ESM resolver can find them. Build-time tooling only.
export async function resolve(specifier, context, next) {
  try {
    return await next(specifier, context);
  } catch (err) {
    if (specifier.startsWith("./") || specifier.startsWith("../")) {
      try {
        return await next(specifier + ".js", context);
      } catch {
        return await next(specifier + "/index.js", context);
      }
    }
    throw err;
  }
}
