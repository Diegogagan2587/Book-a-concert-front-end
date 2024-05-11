import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../redux/store';
import NavigationPanel from './NavigationPanel';

describe('NavigationPanel Component', () => {
  test('renders NavigationPanel without crashing', () => {
    // Arrange , Act and Assert
    render(
      <Provider store={store}>
        <Router>
          <NavigationPanel />
        </Router>
      </Provider>
    );
  });

  it('render the Menu button', () => {
    // Arrange
    render(
      <Provider store={store}>
        <Router>
          <NavigationPanel />
        </Router>
      </Provider>
    );
    // Act
    const menuButton = screen.getByRole('button', { name: /Menu/i });
    // Assert
    expect(menuButton).toBeInTheDocument();
  });
  describe('When user is not authenticated', () => {
  });

  describe('When user is authenticated', () => {
   
  });

});
