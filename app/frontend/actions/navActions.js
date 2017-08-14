import { NAV } from "./constants";

export function setRoute(route){
  return {
    type: NAV.SET_ROUTE,
    payload: route
  }
}
