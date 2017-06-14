import React from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Talant from './Talant'; // Our custom react component

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'


import {Provider} from 'react-redux'
import myStore from './store/index'
window.store = myStore;





// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Render the main app react component into the app div.
// For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
render(
    <Provider store={myStore}>
        <Router >
            <Talant />
        </Router>
    </Provider>, document.getElementById('app')
);
