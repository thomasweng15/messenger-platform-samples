
import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';

import 'weui';
import 'react-weui/lib/react-weui.min.css';

/*
 * Function for attaching the application when MessengerExtensions has loaded
 */
window.attachApp = (viewerId, listId, socketAddress, threadType) => {
  const apiUri = `https://${window.location.hostname}`;
  let app;
  if (viewerId) {
    app = (
      // The main show
      <App
        viewerId={viewerId}
        listId={listId}
        apiUri={apiUri}
        socketAddress={socketAddress}
        threadType={threadType}
      />
    );
  } else {
    /**
     * MessengerExtensions are only available on iOS and Android,
     * so show an error page if MessengerExtensions was unable to start
     */
    app = <h1>Messenger extensions are only available on iOS and Android</h1>;
  }

  ReactDOM.render(app, document.getElementById('content'));
};