import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Tinnat from './client/Tinnat';

// This is a sample comment
render(
    <Router>
        <Tinnat />
    </Router>,
    document.getElementById('root')
);