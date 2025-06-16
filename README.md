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

3️⃣ **Create a `.env` File** and add your Firebase key:
```
VITE_APP_FIREBASE_API_KEY=your_firebase_api_key
```

4️⃣ **Start the Development Server**
```sh
npm run dev
```

---

## 🚀 Deployment
UrbanCart can be deployed easily on **Render**.

### **Deploy on Render**
1. Push your code to a Git repository.
2. In Render, click **New Web Service** and choose **Static Site**.
3. Connect your repository and configure the following settings:
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist/`
4. Add the required environment variable in the **Environment** section:
   - `VITE_APP_FIREBASE_API_KEY`
5. Click **Create Web Service**. Render will build and deploy your static site automatically.

## 🐳 Docker
To build and run the project using Docker:
```sh
docker build -t urbancart .
docker run -p 3000:80 urbancart
```

The Docker image ships with a custom **nginx** configuration (`nginx.conf`) that
redirects all unknown paths to `index.html`. This allows React Router to handle
client-side routes even when the page is refreshed.


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
