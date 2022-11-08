import './App.css';

import React, { useState } from 'react';
import axios from 'axios';

// import Fn components from src/compoenents
import Form from './components/Form.jsx'

// ensure that axios always sends the cookie to the backend server
axios.defaults.withCredentials = false;

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3004';

export default function App() {

    // write your frontend facing REACT paradigm code here





    // 


    return (
        <div>
            <Form />
        </div>
    );

}