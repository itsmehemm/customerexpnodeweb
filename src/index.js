import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Tinnat from './client/Tinnat';

render(
    <Router>
        <Tinnat />
    </Router>,
    document.getElementById('root')
);