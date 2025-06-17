# Customer Dashboard Project

## Overview
This project is a modern customer dashboard for managing vehicle insurance policies. It provides a user-friendly interface for customers to view their insurance policies, get quotes, and navigate through various sections of the application.

## Project Structure
```
customer-dashboard
├── public
│   └── index.html
├── src
│   ├── components
│   │   ├── customer
│   │   │   ├── AllPolicy.jsx
│   │   │   ├── CustomerDashboard.jsx
│   │   │   └── SideBar.jsx
│   │   └── common
│   │       └── Header.jsx
│   ├── assets
│   │   └── styles.css
│   ├── App.jsx
│   ├── index.js
│   └── api
│       └── policy.js
├── package.json
├── .gitignore
└── README.md
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd customer-dashboard
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage
1. Start the development server:
   ```
   npm start
   ```
2. Open your browser and go to `http://localhost:3000` to view the application.

## Features
- View all insurance policies with detailed information.
- Get quotes for selected policies.
- Navigate through the dashboard using the sidebar.
- Responsive design for mobile and desktop views.

## Technologies Used
- React
- Axios for API calls
- CSS for styling

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.