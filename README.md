# Odin Project - Odin-Book (Frontend)

<h2 align="center">Meet Aurora</h2>

<p align="center">
  <img src="https://res.cloudinary.com/dvhkp9wc6/image/upload/v1721036301/odin_book/wlmwfbe3ro623odzogb9.png" width="300" height="300" title="App - Welcome Page - Dark Theme">
  <img src="https://res.cloudinary.com/dvhkp9wc6/image/upload/v1721036301/odin_book/bjpryqtnkwxgx7i0qaky.png" width="300" height="300" title="App - User Details Page - Dark Theme">
  <img src="https://res.cloudinary.com/dvhkp9wc6/image/upload/v1721036301/odin_book/eslijryvdohdsawsd3sr.png" width="300" height="300" title="App - Posts Page With User Popover - Light Theme">
  <img src="https://res.cloudinary.com/dvhkp9wc6/image/upload/v1721036301/odin_book/b3kdzf4u0m0xmnuoimrf.png" width="300" height="300" title="App - Profile Page - Light Theme">
</p>

A Reddit-inspired social news aggregation and content rating app featuring three types of posts (text, image and video), comments, categories and likes.

## Project Revisit (Jan 2025)

I revisited my largest project to date to convert it to TypeScript, fix some tiny bugs, add new functionality and make the app better overall.

Some bigger changes were added to the Features, More Features and Tech Stack sections and are annotated with 🆕.

The full changelog can be found on [Pastebin](https://pastebin.com/vhcNCKHt).

## Features

- Share something you find interesting by creating posts
- Create three types of posts:

  - Text posts with rich text formatting support
  - Image posts (image URL and upload)
  - Video posts (YouTube URL)

- Like and dislike posts
- Sort posts by newest, oldest, likes and comments
- Create categories for your posts, featuring:

  - A category description
  - An icon (upload it or just use the default one)

- Follow categories and users
- Comment on posts
- Like and dislike comments
- View stats for categories and users
- View all posts as well as posts:

  - By followed categories
  - By followed users
  - Liked by you
  - Created by you
  - By any user
  - By any category

- Customise your profile by:

  - Choosing one of the eight default avatars or uploading your own avatar
  - Writing your bio

- Hoverable popovers for user and category links 🆕
- Light and dark mode
- Guest account

### More Features

- Unit and integration tests for both backend and frontend
- Infinite scroll for posts
- Different header on scroll
- Show a loading screen if the server is waking up from sleep
- New post content saved to sessionStorage on navigating to a different page and on page leave
- Loading skeletons for all pages 🆕
- Auto login after signup 🆕
- Theme syncing between app tabs 🆕
- Support for multi-line comments 🆕
- Month indicator for posts sorted by newest and oldest 🆕
- Seamless mobile experience 🆕

### Tech Stack

#### Frontend

- TypeScript 🆕
- React (Vite)
- React Router
- styled-components
- react-icons
- react-spinners
- slugify
- date-fns
- html-react-parser
- js-cookie
- sanitize-html
- react-infinite-scroll-component

#### Backend

- TypeScript 🆕
- Node.js (Express)
- MongoDB (Mongoose)
- Passport JWT Strategy (authentication)
- Cloudinary
- Multer

#### Frontend Testing

- Vitest
- React Testing Library
- jsdom

#### Backend Testing

- Vitest
- SuperTest
- mongodb-memory-server
