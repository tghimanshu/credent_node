# Credent Global

This is a Node.js web application for Credent Global, featuring a dynamic website with portfolio management, referrals, and contact forms. It uses Express for the backend and EJS for templating.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)

## Features

- **Dynamic Content Rendering**: Uses EJS templates for server-side rendering.
- **Form Handling**: Supports submissions for PMS (Portfolio Management Services), RAF (Refer a Friend), and general inquiries.
- **File Uploads**: Allows uploading factsheets via the admin interface.
- **Data Persistence**: Stores contact form submissions and file metadata in JSON files (`data/contacts.json`, `data/data.json`).
- **Interactive UI**: Includes charts (Chart.js), carousels (Owl Carousel), and custom responsive navigation.
- **Admin Interface**: A simple superuser route to view collected data.

## Prerequisites

- Node.js (v14.x or higher recommended)
- npm (Node Package Manager)

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd credent_global
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## Usage

1. **Start the server:**
   ```bash
   npm start
   ```
   Or directly with node:
   ```bash
   node index.js
   ```

2. **Access the application:**
   Open your browser and navigate to `http://localhost:3000`.

3. **Admin Access:**
   Navigate to `http://localhost:3000/superuser` to view submitted contact forms.

## Project Structure

```
credent_global/
├── assets/             # Static assets (CSS, JS, Fonts, Images)
│   ├── css/
│   ├── fonts/
│   ├── icons/
│   ├── img/
│   └── js/             # Client-side JavaScript
├── data/               # Data storage
│   ├── factsheet/      # Uploaded factsheets
│   ├── contacts.json   # Stored contact form submissions
│   └── data.json       # Metadata for downloads
├── views/              # EJS templates
│   ├── admin.ejs
│   └── index.ejs
├── index.js            # Main Express application entry point
├── package.json        # Project dependencies and scripts
└── README.md           # Project documentation
```

## API Endpoints

- `GET /`: Home page.
- `GET /superuser`: Admin dashboard to view leads.
- `POST /pms`: Submit PMS inquiry.
- `POST /raf`: Submit Refer a Friend form.
- `POST /contact`: Submit Contact Us form.
- `GET /get/:data`: Retrieve JSON data for `pms`, `raf`, or `contact`.
- `POST /factsheet`: Upload a new factsheet file (Admin).
- `GET /downloadfs`: Download the latest factsheet.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a Pull Request.
