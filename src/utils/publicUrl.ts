/**
 * Public and Live Application URLs for Eco Medicines & Vitamin
 */

export const DEV_APP_URL = 'https://ais-dev-trr7vpafbugjwutkyf2cj4-145769746246.asia-southeast1.run.app';
export const SHARED_APP_URL = 'https://ais-pre-trr7vpafbugjwutkyf2cj4-145769746246.asia-southeast1.run.app';

/**
 * Returns the currently active live storefront URL.
 * Uses window.location.origin if running in browser to ensure 
 * that the link always points to an active, working instance 
 * without Google 404 errors.
 */
export function getLiveStoreUrl(): string {
  if (typeof window !== 'undefined' && window.location && window.location.origin) {
    const origin = window.location.origin;
    if (!origin.includes('localhost') && !origin.includes('127.0.0.1')) {
      return origin;
    }
  }
  return DEV_APP_URL;
}

/**
 * Returns the shared cloud URL.
 * Note: Cloud Run activates this URL when the user publishes via the "Share" button.
 */
export function getSharedStoreUrl(): string {
  if (typeof window !== 'undefined' && window.location && window.location.origin) {
    const origin = window.location.origin;
    if (origin.includes('ais-dev-')) {
      return origin.replace('ais-dev-', 'ais-pre-');
    }
    if (!origin.includes('localhost') && !origin.includes('127.0.0.1')) {
      return origin;
    }
  }
  return SHARED_APP_URL;
}

/**
 * Default getter: prefers the active live URL so that users and customers 
 * never get a 404 "Page not found" Google error.
 */
export function getPublicStoreUrl(overrideUrl?: string, useShared = false): string {
  if (overrideUrl && overrideUrl.trim()) {
    return overrideUrl;
  }
  return useShared ? getSharedStoreUrl() : getLiveStoreUrl();
}
