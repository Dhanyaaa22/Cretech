import { MESSAGE_EVENTS } from '@mfe/MessageEvents.interface';
import { useAppSelector } from '@redux/hooks';
import { SubPaths } from './useMessageEvents.interface';

/**
 * Custom hook to handle message events for navigation within the micro-frontend architecture.
 * This hook provides a function to trigger navigation events with optional sub-paths and tab paths.
 *
 * @returns {Function} A function that takes a path and an optional sub-path object and triggers a window postMessage event for navigation.
 */
export const useMessageEvents = () => {
  // Retrieve the base URL from the Redux store
  const baseUrl = useAppSelector((state) => state.mfeData.baseUrl);

  /**
   * Function to trigger a navigation event.
   *
   * @param {string} path - The route path for the navigation event.
   * @param {SubPaths} subPath - An object containing optional childPath and tabPath.
   */
  const triggerEvent = (
    path: string,
    subPath?: SubPaths,
    prevPath?: string
  ) => {
    let routePath = path;

    // Append childPath to the route if it exists
    if (subPath?.childPath) {
      routePath += `/${subPath.childPath}`;
    }

    // Append tabPath as a query parameter if it exists
    if (subPath?.tabPath) {
      routePath += `?tab=${subPath.tabPath}`;
    }

    // Trigger the window postMessage event with the constructed URL
    window.postMessage({
      type: MESSAGE_EVENTS.SERVICE_NAVIGATION,
      payload: {
        pathname: `${baseUrl}${routePath}`,
        prevPath: prevPath,
      },
    });
  };

  return { triggerEvent };
};