# 🧺 Gather

A collaborative, over-the-air **recipe, grocery list, and meal planning app** for families, roommates, or any shared household. Built with **React Native + Expo**, backed by **Firebase**.

---

## 🚀 Features

- 🔐 Household-based authentication & user roles (admin, member, viewer)
- 🧾 Recipe entry with scalable servings and ingredients
- 🛒 Grocery list generator from selected recipes
- 📆 Weekly meal planner with calendar view
- 🔄 Real-time data sync across devices (via polling or Supabase-ready)
- 👪 Multi-user collaboration in one household
- 🌐 Optional web dashboard (Next.js, planned)

---

## 🧱 Tech Stack


| Layer         | Tech Choice                        |
| ------------- | ---------------------------------- |
| Frontend      | React Native + Expo (mobile-first) |
| Backend       | Node.js + Express                  |
| Auth          | Firebase Auth                      |
| Realtime Sync | Firebase RTDB                      |
| Data Storage  | Firestore (recipes, users)         |
| Web           | React.js                           |


---

## 📂 Project Structure

```
family-meal-planner/
│
├── backend/                # Express API + Firebase
│   ├── config/            # Firebase configuration
│   ├── routes/            # Auth, Recipes, Lists, Planner
│   └── index.js           # Entry point
│
├── mobile/                # React Native frontend
│   ├── screens/           # Login, Recipes, Grocery, Calendar
│   ├── components/        # UI components
│   └── App.js             # Root navigation
│
├── README.md
└── .env
```

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Firebase Project](https://console.firebase.google.com)
- [Firebase CLI](https://firebase.google.com/docs/cli)

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/family-meal-planner.git
cd family-meal-planner
```

---

### 2. Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable Authentication and Firestore
3. Download your service account key for backend
4. Get your Firebase config for the mobile app

```bash
# Install Firebase tools
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project
firebase init
```

---

### 3. Backend Setup

```bash
cd backend
npm install

# Create .env with your Firebase credentials
cp .env.example .env

# Run locally
npm run dev
```

---

### 4. Frontend Setup

```bash
cd mobile
npm install
npx expo start
```

Update your Firebase configuration in the mobile app.

---

## 🔑 Environment Variables

### `.env` (backend)

```env
PORT=3000
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-client-email
```

---

## 🛣️ Roadmap

* [x] Household-based Auth
* [x] Recipe creation + scaling
* [x] Grocery list builder
* [x] Meal planner
* [ ] Real-time sync
* [ ] Web dashboard
* [ ] Calendar reminders
* [ ] AI meal suggestions

---

## 📄 License

MIT © 2025 Haywood D. Johnson

---

## 💬 Feedback or Ideas?

Feel free to open an issue or reach out on [LinkedIn](https://www.linkedin.com/in/haywoodjohnson/) or via email!

```

---

Would you like this broken into multiple markdown files (like `CONTRIBUTING.md`, `API.md`, etc.), or want a version pre-filled with your actual repo or database details?
```
