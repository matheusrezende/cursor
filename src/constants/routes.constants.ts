export const ROUTES = {
  HOME: '/',
  MOVIE_DETAILS: '/movie/:id',
  SEARCH: '/search',
  WATCHLIST: '/watchlist',
  WATCHED: '/watched',
} as const;

export type RouteKey = keyof typeof ROUTES; 