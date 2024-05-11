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

    // Test case to check if navigation toggles when menu button is clicked
  });

  test('logs out user when logout button is clicked', () => {
    // Test case to check if user is logged out when logout button is clicked
  });

  test('renders correct navigation links based on authentication status', () => {
    // Test case to check if navigation links render correctly based on authentication status
  });

  test('redirects to homepage after logout', () => {
    // Test case to check if user is redirected to homepage after logout
  });

  test('updates navigation links when authentication status changes', () => {
    // Test case to check if navigation links update when authentication status changes
  });
});
