import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
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

    it('should not render: Logout, Reserve, Reservations, Add Concert and Delete Concert', () => {
      // Arrange
      render(
        <Provider store={store}>
          <Router>
            <NavigationPanel />
          </Router>
        </Provider>
      );
      // Act
      const logoutButton = screen.queryByRole('button', { name: /Logout/i });
      const reserveElement = screen.queryByText(/Reserve/i);
      const reservationsElement = screen.queryByText(/Reservations/i);
      const addConcertElement = screen.queryByText(/Add Concert/i);
      const deleteConcertElement = screen.queryByText(/Delete Concert/i);
      // Assert
      expect(logoutButton).not.toBeInTheDocument();
      expect(reserveElement).not.toBeInTheDocument();
      expect(reservationsElement).not.toBeInTheDocument();
      expect(addConcertElement).not.toBeInTheDocument();
      expect(deleteConcertElement).not.toBeInTheDocument();
    });
    it('redirects to login page when login button is clicked', () => {
      // Arrange
      render(
        <Provider store={store}>
          <Router>
            <NavigationPanel />
          </Router>
        </Provider>
      );
      // Act
      const loginElement = screen.getByText(/Login/i);
      act(() => loginElement.click());
      // Assert
      expect(window.location.pathname).toBe('/login');
    });
  });

  describe('When user is authenticated', () => {
  });
});
