import { app } from "@/lib/firebase";
import {
  getAnalytics,
  logEvent as logFirebaseEvent,
  isSupported,
} from "firebase/analytics";
import mixpanel from "mixpanel-browser";

const IS_FIREBASE_ANALYTICS_ENABLED =
  process.env.NEXT_PUBLIC_ENABLE_FIREBASE_ANALYTICS === "true";
const IS_MIXPANEL_ANALYTICS_ENABLED =
  process.env.NEXT_PUBLIC_ENABLE_MIXPANEL_ANALYTICS === "true";

const firebaseAnalytics = isSupported().then((yes) => {
  if (yes && IS_FIREBASE_ANALYTICS_ENABLED) {
    return getAnalytics(app);
  }
  return false;
});

if (IS_MIXPANEL_ANALYTICS_ENABLED) {
  const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_PROJECT_TOKEN;

  MIXPANEL_TOKEN &&
    mixpanel.init(MIXPANEL_TOKEN, {
      debug: process.env.NODE_ENV === "development",
      track_pageview: true,
      persistence: "localStorage",
    });
}

/**
 * Defines the available analytics platforms.
 */
const AnalyticsPlatforms = {
    FIREBASE: "FIREBASE",
    MIXPANEL: "MIXPANEL",
};

type AnalyticsPlatforms = typeof AnalyticsPlatforms;

/**
 * Defines the event names used in analytics.
 */
export const EventNames = {
  SEARCH: "Search",
  SEARCH_REQUEST: "Search_Request",
  PRODUCT_CLICK: "Product_Click",
  ERRORED_SEARCH_RETRY: "Errored_Search_Retry",
  EMPTY_SEARCH_RETRY: "Empty_Search_Retry",
};

export type EventNames = typeof EventNames;

/**
 * Defines the event parameters used in analytics.
 */
export const EventParams = {
  SEARCH_TERM: "search_term",
  SEARCH_LOCATION: "search_location",
};

export type EventParams = typeof EventParams;

/**
 * Defines the possible search locations for analytics tracking.
 */
export const SearchLocations = {
  HOME: "home",
  SEARCH_RESULTS: "search_results",
};

export type SearchLocations = typeof SearchLocations;

/**
 * Logs an event with the given event name and optional event parameters.
 * @param eventName - The name of the event to be logged.
 * @param eventParams - Optional parameters associated with the event.
 */
export const logEvent = (
  eventName: string,
  eventParams?: { [key: string]: any },
  platforms?: `${keyof AnalyticsPlatforms}`[],
) => {
  try {
    (!platforms || platforms.includes("FIREBASE")) && IS_FIREBASE_ANALYTICS_ENABLED &&
      firebaseAnalytics.then((analytics) => {
        if (analytics) {
          logFirebaseEvent(analytics, eventName, eventParams);
        }
      });
  } catch (error) {
    console.error(error);
  }

    try {
        (!platforms || platforms.includes("MIXPANEL")) && IS_MIXPANEL_ANALYTICS_ENABLED &&
        mixpanel.track(eventName, eventParams);
    } catch (error) {
        console.error(error);
    }
};
