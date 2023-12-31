import { app } from "@/lib/firebase";
import { getAnalytics, logEvent as logFirebaseEvent, isSupported } from "firebase/analytics";

const environment = process.env.NODE_ENV || 'development';
const shouldLogEvents = environment === 'production';
const analytics = isSupported().then(yes => {
    if (yes && shouldLogEvents) {
        return getAnalytics(app);
    }
    return false;
});

export const EventNames = {
    SEARCH: 'search',
};
export type EventNames = typeof EventNames;

export const EventParams = {
    SEARCH_TERM: 'search_term',
    SEARCH_LOCATION: 'search_location',
};
export type EventParams = typeof EventParams;

export const SearchLocations = {
    HOME: 'home',
    SEARCH_RESULTS: 'search_results',
};
export type SearchLocations = typeof SearchLocations;


/**
 * Logs an event with the given event name and optional event parameters.
 * @param eventName - The name of the event to be logged.
 * @param eventParams - Optional parameters associated with the event.
 */
export const logEvent = (eventName: string, eventParams?: { [key: string]: any }) => {
   shouldLogEvents && analytics.then((analytics) => {
        if (analytics) {
            logFirebaseEvent(analytics, eventName, eventParams);
        }
    });
}