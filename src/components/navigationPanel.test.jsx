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
    it('redirects to signup page when signup button is clicked', () => {
      // Arrange
      render(
        <Provider store={store}>
          <Router>
            <NavigationPanel />
          </Router>
        </Provider>
      );
      // Act
      const signupElement = screen.getByText(/Signup/i);
      act(() => signupElement.click());
      // Assert
      expect(window.location.pathname).toBe('/signup');
    });
    it('redirects to homepage when home button is clicked', () => {
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
      act(() => homeElement.click());
      // Assert
      expect(window.location.pathname).toBe('/');
    });
  });

  describe('When user is authenticated', () => {
    const loggedInState = {
      user: {
        details: {
          data: {
            user: {
              id: 11,
              email: 'luffy@mail.com',
              name: 'luffy',
            },
          },
        },
      },
      getState: () => loggedInState, // mocks the getState function
      subscribe: () => {}, // mocks the subscribe function
    };
    it('should render: Home, Reserve, Reservations, Add Concert, Delete Concert and LogOut buttons', () => {
      // Arrange
      render(
        <Provider store={loggedInState}>
          <Router>
            <NavigationPanel />
          </Router>
        </Provider>
      );
      // Act
      const homeElement = screen.getByText(/Home/i);
      const reserveElement = screen.getByText(/Reserve/i);
      const reservationsElement = screen.getByText(/Reservations/i);
      const addConcertElement = screen.getByText(/Add Concert/i);
      const deleteConcertElement = screen.getByText(/Delete Concert/i);
      const logoutButton = screen.getByRole('button', { name: /Logout/i });
      // Assert
      expect(homeElement).toBeInTheDocument();
      expect(reserveElement).toBeInTheDocument();
      expect(reservationsElement).toBeInTheDocument();
      expect(addConcertElement).toBeInTheDocument();
      expect(deleteConcertElement).toBeInTheDocument();
      expect(logoutButton).toBeInTheDocument();
    });
    it('should not render: Login and Signup', () => {
      // Arrange
      render(
        <Provider store={loggedInState}>
          <Router>
            <NavigationPanel />
          </Router>
        </Provider>
      );
      // Act
      const loginElement = screen.queryByText(/Login/i);
      const signupElement = screen.queryByText(/Signup/i);
      // Assert
      expect(loginElement).not.toBeInTheDocument();
      expect(signupElement).not.toBeInTheDocument();
    });
    it('redirects to homepage when home button is clicked', () => {
      // Arrange
      render(
        <Provider store={loggedInState}>
          <Router>
            <NavigationPanel />
          </Router>
        </Provider>
      );
      // Act
      const homeElement = screen.getByText(/Home/i);
      act(() => homeElement.click());
      // Assert
      expect(window.location.pathname).toBe('/');
    });
    it('redirects to reserve page when reserve button is clicked', () => {
      // Arrange
      render(
        <Provider store={loggedInState}>
          <Router>
            <NavigationPanel />
          </Router>
        </Provider>
      );
      // Act
      const reserveElement = screen.getByText(/Reserve/i);
      act(() => reserveElement.click());
      // Assert
      expect(window.location.pathname).toBe('/reserve');
    });
    it('redirects to reservations page when reservations button is clicked', () => {
      // Arrange
      render(
        <Provider store={loggedInState}>
          <Router>
            <NavigationPanel />
          </Router>
        </Provider>
      );
      // Act
      const reservationsElement = screen.getByText(/Reservations/i);
      act(() => reservationsElement.click());
      // Assert
      expect(window.location.pathname).toBe('/my-reservations');
    });
    it('redirects to add concert page when add concert button is clicked', () => {
      // Arrange
      render(
        <Provider store={loggedInState}>
          <Router>
            <NavigationPanel />
          </Router>
        </Provider>
      );
      // Act
      const addConcertElement = screen.getByText(/Add Concert/i);
      act(() => addConcertElement.click());
      // Assert
      expect(window.location.pathname).toBe('/add-concert');
    });
  });
});
