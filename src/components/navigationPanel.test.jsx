import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../redux/store';
import NavigationPanel from './NavigationPanel';

describe('NavigationPanel Component', () => {
  it('renders NavigationPanel without crashing', () => {
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
    it('renders navigation links: Home, Login, SignUp', () => {
      // Arrange
      render(
        <Provider store={store}>
          <Router>
            <NavigationPanel />
          </Router>
        </Provider>
      );
      // Act
      const homeElement = screen.getByText(/Home/i);
      const loginElement = screen.getByText(/Login/i);
      const signupElement = screen.getByText(/Signup/i);
      // Assert
      expect(homeElement).toBeInTheDocument();
      expect(loginElement).toBeInTheDocument();
      expect(signupElement).toBeInTheDocument();
    });
  });

  describe('When user is authenticated', () => {
  });
});
