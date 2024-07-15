# Odin Project - Odin-Book (Frontend)

<h3 align="center">Meet Aurora</h3>

<p align="center">
  <img src="https://res.cloudinary.com/dvhkp9wc6/image/upload/v1721036301/odin_book/phyuajtrnec3hlzlklos.png" height="500" title="App - Posts Page">
</p>

A Reddit-inspired social news aggregation and content rating app featuring three types of posts (text, image and video), comments, categories and likes.

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

- Light and dark mode
- Guest account

### More Features

- Unit and integration tests for both backend and frontend
- Infinite scroll for posts
- Different header on scroll
- Show a loading screen if the server is waking up from sleep
- New post content saved to sessionStorage on navigating to a different page and on page leave

### Tech Stack

#### Frontend

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
