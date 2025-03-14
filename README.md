# UrbanCart 🛒

UrbanCart is a modern online shopping platform that offers a seamless shopping experience with a robust cart, checkout features, and Firebase authentication. The project is built using **React, Redux, Firebase, and React Router**.

---

## 🚀 Features

- 🔐 **Authentication**: Login & Signup with Firebase Authentication
- 🛒 **Product Display**: Browse and view product details
- 🛒 **Shopping Cart**: Add and remove products
- 💳 **Checkout**: Secure checkout process with Razorpay integration
- 💤 **State Management**: Redux for global state management
- 🔍 **Filtering & Sorting**: Sort and filter products easily
- ✅ **Protected Routes**: Access cart and checkout only when logged in
- 📢 **Toasts & Notifications**: Real-time feedback using `react-toastify`

---

## 📚 Project Structure

```
UrbanCart/
│── public/
│── src/
│   ├── assets/
│   ├── components/
│   ├── firebase/
│   ├── redux/
│   ├── screens/
│   ├── App.jsx
│   ├── main.jsx
│── .gitignore
│── package.json
│── README.md
│── vite.config.js
```

---

## 🛠️ Installation & Setup

1️⃣ **Clone the Repository**
```sh
git clone https://github.com/tchawla827/UrbanCart.git
cd UrbanCart
```

2️⃣ **Install Dependencies**
```sh
npm install
```

3️⃣ **Create a `.env` File** and add Firebase & API Keys:
```
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_OPENAI_API_KEY=your_openai_api_key
```

4️⃣ **Start the Development Server**
```sh
npm run dev
```

---

## 🚀 Deployment
UrbanCart can be deployed easily on platforms like **Netlify, Vercel, or Firebase Hosting**.

### **Deploy on Netlify**
1. Build the project:
   ```sh
   npm run build
   ```
2. Drag and drop the `dist/` folder to **Netlify** or use the CLI:
   ```sh
   netlify deploy
   ```

### **Deploy on Vercel**
1. Install Vercel CLI:
   ```sh
   npm install -g vercel
   ```
2. Deploy:
   ```sh
   vercel
   ```

---

## 📸 Screenshots

### Home Page
![Home Page](screenshots/home.png)

### Product Details Page
![Product Details](screenshots/product_details.png)

---

## Author
**Tavish Chawla**  
✉️ Email: [tchawla827@gmail.com](mailto:tchawla827@gmail.com)  
