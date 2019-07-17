import React from 'react';
import { render } from 'react-dom';

import App from './components/App';

const myForm = <App />;
const rootEl = document.getElementById( 'root' );

render( myForm, rootEl );