# 🔐 PassOP - Your Personal Password Manager

<div align="center">
**A modern, secure, and user-friendly password manager built with React and Vite**
</div>



## 🎯 About

**PassOP** is a lightweight, client-side password manager that helps you securely store and manage your passwords locally in your browser. Built with modern web technologies, it provides a clean and intuitive interface for managing your credentials without relying on cloud storage.

### Why PassOP?

- 🔒 **100% Local Storage** - All data is stored locally in your browser
- 🚀 **Fast & Lightweight** - Built with Vite for optimal performance
- 🎨 **Modern UI** - Beautiful interface with TailwindCSS
- 📱 **Responsive Design** - Works seamlessly on all devices
- 🔓 **Open Source** - Transparent and community-driven

---

## ✨ Features

### Core Functionality

- ✅ **Add Passwords** - Store website URLs, usernames, and passwords
- ✏️ **Edit Entries** - Inline editing with save/cancel options
- 🗑️ **Delete Passwords** - Remove unwanted entries with a single click
- 👁️ **Toggle Password Visibility** - Show/hide passwords as needed
- 📋 **Copy to Clipboard** - Quick copy for usernames and passwords
- 🔗 **Clickable URLs** - Direct links to saved websites

### User Experience

- 🎨 **Modern Gradient Background** - Eye-catching radial gradient design
- 📊 **Tabular Display** - Clean table layout for saved passwords
- ⚡ **Real-time Updates** - Instant feedback on all actions
- 🔔 **Alert Notifications** - User-friendly alerts for copy actions
- ✔️ **Form Validation** - Ensures all fields are filled before saving

### Security Features

- 🔐 **Password Masking** - Passwords hidden by default
- 💾 **Local Storage** - No data sent to external servers
- 🛡️ **Client-Side Only** - Complete privacy and control

---

## 🎬 Demo

### Main Interface

The application features a clean, modern interface with:
- Navigation bar with Home, About, and Contact links
- Password input form with visibility toggle
- Searchable password table with inline editing
- Responsive footer with copyright information

### Key Interactions

1. **Adding a Password**: Fill in site URL, username, and password → Click "Add Your Password"
2. **Editing**: Click the edit icon → Modify fields → Save or Cancel
3. **Copying**: Click the copy icon next to username/password
4. **Deleting**: Click the delete icon to remove an entry

---

## 🛠️ Tech Stack

### Frontend Framework
- **React 19.1.0** - Modern UI library with hooks
- **React DOM 19.1.0** - DOM rendering

### Build Tool
- **Vite 7.0.4** - Next-generation frontend tooling
- **@vitejs/plugin-react 4.6.0** - Official React plugin for Vite

### Styling
- **TailwindCSS 4.1.11** - Utility-first CSS framework
- **@tailwindcss/vite 4.1.11** - Vite integration for Tailwind

### Code Quality
- **ESLint 9.30.1** - JavaScript linting
- **eslint-plugin-react-hooks 5.2.0** - React hooks linting
- **eslint-plugin-react-refresh 0.4.20** - React refresh linting

### Development Tools
- **TypeScript Types** - Type definitions for React
- **Globals 16.3.0** - Global variables for ESLint

---

## 📦 Installation

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/ShaikMohammad786/Simple-Password-Manager.git
   cd PassOP
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   Navigate to http://localhost:5173
   ```

### Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

---

## 🚀 Usage

### Adding a New Password

1. Enter the website URL in the "Site URL" field
2. Enter your username
3. Enter your password (use the eye icon to toggle visibility)
4. Click "Add Your Password" button
5. Your password will appear in the table below

### Editing an Existing Password

1. Locate the password entry in the table
2. Click the **edit icon** (pencil)
3. Modify the fields as needed
4. Click **Save** to confirm or **Cancel** to discard changes

### Copying Credentials

- Click the **copy icon** next to username or password
- An alert will confirm the copy action
- Paste anywhere using Ctrl+V (or Cmd+V on Mac)

### Deleting a Password

1. Click the **delete icon** (trash bin) next to the entry
2. The password will be immediately removed from storage

### Accessing Saved Websites

- Click on any site URL in the table to open it in a new tab

---

## 📁 Project Structure

```
PassOP/
├── public/                          # Static assets
│   ├── content_copy_24dp_*.svg     # Copy icon
│   ├── delete_24dp_*.svg           # Delete icon
│   ├── edit_24dp_*.svg             # Edit icon
│   ├── visibility_24dp_*.svg       # Show password icon
│   ├── visibility_off_24dp_*.svg   # Hide password icon
│   └── vite.svg                    # Vite logo
├── src/
│   ├── Components/
│   │   ├── Manager.jsx             # Main password manager component
│   │   ├── Manager.css             # Manager styles
│   │   ├── Nav.jsx                 # Navigation bar component
│   │   ├── Nav.css                 # Navigation styles
│   │   ├── Footer.jsx              # Footer component
│   │   └── Footer.css              # Footer styles
│   ├── assets/                     # Additional assets
│   ├── App.jsx                     # Main app component with background
│   ├── App.css                     # App styles
│   ├── main.jsx                    # Entry point
│   └── index.css                   # Global styles
├── index.html                      # HTML template
├── package.json                    # Dependencies and scripts
├── vite.config.js                  # Vite configuration
├── eslint.config.js                # ESLint configuration
├── .gitignore                      # Git ignore rules
└── README.md                       # This file
```

---

## 🧩 Components

### 1. **Manager Component** (`Manager.jsx`)

The core component that handles all password management functionality.

**Key Features:**
- State management with React hooks (`useState`, `useRef`, `useEffect`)
- LocalStorage integration for data persistence
- CRUD operations (Create, Read, Update, Delete)
- Form validation
- Clipboard API integration

**State Variables:**
- `form` - Current input form data
- `PasswordArray` - Array of saved passwords
- `editingIndex` - Index of currently editing entry
- `editForm` - Form data for editing mode

**Key Functions:**
- `SavePassword()` - Adds new password to storage
- `EditPassword(index)` - Enables edit mode for an entry
- `SaveEdit()` - Saves edited password
- `DeletePassword(index)` - Removes password from storage
- `togglePassword()` - Shows/hides password input
- `HandleChange()` - Updates form state
- `HandleEditChange()` - Updates edit form state

### 2. **Nav Component** (`Nav.jsx`)

Navigation bar with branding and menu items.

**Features:**
- PassOP branding with styled logo
- Navigation links (Home, About, Contact)
- Hover effects with smooth transitions
- Responsive design with Flexbox

### 3. **Footer Component** (`Footer.jsx`)

Footer section with copyright information.

**Features:**
- Copyright notice
- PassOP branding
- Sticky positioning at bottom
- Consistent styling with navbar

### 4. **App Component** (`App.jsx`)

Main application wrapper with background styling.

**Features:**
- Radial gradient background
- Full-screen layout
- Z-index management for layering

---


## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 📧 Contact

**Shaik Mohammad**

- GitHub: [@ShaikMohammad786](https://github.com/ShaikMohammad786)
- Email: skmohammad378@gmail.com
- Project Link: [Simple-Password-Manager](https://github.com/ShaikMohammad786/Simple-Password-Manager)

