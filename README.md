# Simplyfiy Toy Store

A full-stack toy store e-commerce application built with Next.js, TypeScript, MongoDB, Tailwind CSS, and Zustand.

## Features

### Customer Features

* User Registration
* User Login & Logout
* JWT Authentication
* Account Management
* Change Password
* Product Listing
* Product Details Page
* Category Based Browsing
* Search Functionality
* Wishlist Management
* Cart Management
* Persistent User-Specific Cart
* Persistent User-Specific Wishlist
* Responsive Design

### Admin Features

* Role-Based Authentication
* Admin Dashboard
* Order Management (Planned)
* Inventory Management (Planned)

## Tech Stack

### Frontend

* Next.js 16
* React 19
* TypeScript
* Tailwind CSS
* Zustand
* Lucide React

### Backend

* Next.js Route Handlers
* MongoDB Atlas
* Mongoose
* JWT Authentication
* bcryptjs

## Project Structure

src/

├── app/

├── components/

├── context/

├── lib/

├── models/

├── store/

├── types/

└── data/

## Authentication

Authentication is implemented using:

* JWT Tokens
* HttpOnly Cookies
* Protected Routes
* Role-Based Access Control

## State Management

Zustand is used for:

* Shopping Cart
* Wishlist
* User-Specific Persistence

## Database

MongoDB Atlas stores:

* Users
* Products
* Orders
* Authentication Data

## Environment Variables

Create a `.env.local` file:

```env
MONGODB_URI=your_mongodb_uri

JWT_SECRET=your_secret

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Installation

```bash
npm install
```

## Run Development Server

```bash
npm run dev
```

## Build Production Version

```bash
npm run build
```

## Start Production Server

```bash
npm start
```

## Future Enhancements

* ShipRocket Payment Gateway
* Order Tracking
* Admin Analytics
* Product Reviews
* Coupon System
* Email Notifications
* Inventory Alerts
