import React from 'react';
import Header from './components/common/Header';
import CustomerDashboard from './components/customer/CustomerDashboard';
import './assets/styles.css';

function App() {
    return (
        <div>
            <Header />
            <CustomerDashboard />
        </div>
    );
}

export default App;