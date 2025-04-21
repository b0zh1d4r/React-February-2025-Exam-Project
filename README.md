# GaragiX (React & JSX)

A dynamic platform for buying and selling vehicles, built with React and JSX.

## 🚀 Features:

- User-friendly interface for listing and browsing vehicles.
- Secure authentication and user management.
- Advanced search and filtering options.
- Responsive and modern design.
- Open-source and customizable.
- Code explanations.

## 🛠 Installation:

### **Server Setup:**
1. Navigate to the server directory:

    ```bash
    cd server
    ```
2. Install the server dependencies:

    ```bash
    npm install
    ```

### **Client Setup:**
1. Navigate to the client directory:

    ```bash
    cd client
    ```
2. Install the client dependencies:

    ```bash
    npm install
    ```

### Set Up Environment Variables:

Since this project utilizes cookies for authentication, you need to create a `.env` file to store sensitive information, such as the `JWT_SECRET`.

1. Create a `.env` file in the root directory of the server (if it doesn't already exist).

2. Add the following environment variable to the `.env` file:

    ```env
    JWT_SECRET=your_secret_key_here
    ```

   Replace `your_secret_key_here` with a strong, secure secret key used for signing JWT tokens.


3. Ensure that the server is able to read environment variables by using the `dotenv` package (which should already be included in the server dependencies).

### **MongoDB Setup:**

1. Make sure you have MongoDB installed and running locally, or set up a free cluster via [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. If using a local MongoDB server, the default connection URI is:

    ```bash
    mongodb://localhost:27017/GaragiX
    ```

3. Create a database named `GaragiX` and define your collections as needed (e.g., `users`, `items`).

## 🏃 Running:

### **Server:**

1. Open a terminal and navigate to the `server` directory:

    ```bash
    cd server
    ```

2. Start the server by running the following command:

    ```bash
    npm run dev
    ```

   The server should now be running at `http://localhost:8888`.

### **Client:**

1. Open a new terminal and navigate to the `client` directory:

    ```bash
    cd client
    ```

2. Start the client by running the following command:

    ```bash
    npm run dev
    ```

   The client should now be accessible at `http://localhost:5173`.

## 🏎️ Usage:
1. Open the app in your browser at http://localhost:5173.
2. Register or log in to access full features.
3. List your vehicle for sale or browse available listings.
4. Use filters to refine your search and find the perfect vehicle.

## 🤝 Contributing:
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch (feature-new).
3. Commit your changes.
4. Push the branch and open a pull request.

## 📜 License:
This project is licensed under the MIT License - see the LICENSE file for details.

## 📧 Contact:
For any inquiries, feel free to reach out at bozhidarivanov24@gmail.com or open an issue.
