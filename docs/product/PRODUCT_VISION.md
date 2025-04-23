# Product Vision: TMDB Watchlist App

## 1. Introduction / Overview

*   A simple, client-side web application for movie enthusiasts.
*   Allows users to discover movies using The Movie Database (TMDB) API.
*   Enables users to maintain personal watchlists and track movies they have already seen.
*   Focuses on a streamlined user experience with all data stored locally in the browser's Local Storage.

## 2. Goals / Objectives

*   Provide an easy way to search and browse movies via the TMDB API.
*   Allow users to add movies to a "Watchlist".
*   Allow users to mark movies as "Watched".
*   Persist user data (watchlist, watched list) locally without requiring user accounts or a backend server.
*   Offer a clean, intuitive user interface using Material UI.

## 3. Target Audience

*   Casual movie watchers who want a simple tool to keep track of movies they want to see or have seen.
*   Users who prefer not to create online accounts for simple tracking tasks.
*   Individuals looking for a lightweight, browser-based movie tracking solution.

## 4. Key Features

*   **Movie Discovery:**
    *   Search movies by title (using TMDB API).
    *   Browse popular/upcoming movies (using TMDB API).
    *   View movie details (title, poster, overview, rating - from TMDB API).
*   **Watchlist Management:**
    *   Add movies to a personal watchlist.
    *   Remove movies from the watchlist.
    *   View the watchlist.
*   **Watched List Management:**
    *   Mark movies (from search/details or watchlist) as watched.
    *   View the list of watched movies.
    *   (Optional: Ability to unmark as watched).
*   **Local Persistence:**
    *   Automatically save watchlist and watched list data to the browser's Local Storage.
    *   Load saved data when the application starts.

## 5. Technology Choices

*   **Frontend:** React, TypeScript, Material UI
*   **Data Fetching:** TanStack Query (React Query)
*   **Routing:** React Router
*   **API:** The Movie Database (TMDB) API
*   **Storage:** Browser Local Storage

## 6. Non-Goals (Out of Scope for Initial Version)

*   User accounts or authentication.
*   Server-side data storage or synchronization across devices.
*   Social features (sharing, recommendations based on friends).
*   Tracking TV shows or other media types.
*   Advanced filtering or sorting options beyond basic lists.
*   Offline access beyond cached API data managed by React Query.