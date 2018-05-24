import React from 'react';
import ReactDOM from 'react-dom';
import CheckApp from './CheckApp';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CheckApp />, div);
  ReactDOM.unmountComponentAtNode(div);
});
