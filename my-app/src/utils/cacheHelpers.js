import requestCache from "./requestCache";

// Remove One Cache Entry
export function clearCache(key) {
  requestCache.delete(key);

  console.log("Cache Cleared:", key);
}

// Clear All Cache
export function clearAllCache() {
  requestCache.clear();

  console.log("All Cache Cleared");
}
