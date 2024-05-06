import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../redux/store';
import NavigationPanel from './NavigationPanel';
import { expect } from 'vitest';

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

  it('at first renders display Home, Login and Signup if Desktop', () => {
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

  it('at first render display Hamburger Icon if Mobile', () => {
    //this is the tests im workng on
    // Arrange
    render(
      <Provider store={store}>
        <Router>
          <NavigationPanel />
        </Router>
      </Provider>
    );
    const resizeWindow = (x,y) => {
      //x = horizontal size, y = vertical size
      window.innerWidth = x;
      window.innerHeight = y;
      window.dispatchEvent(new Event('resize'));
    }
    // Act
    resizeWindow(639, 568);
    //we need a creen get by name = menu-outline to get the compoent
    const menuElement = screen.getById('menu-icon');
    // Assert
    expect(menuElement).toBeInTheDocument();
  });

  it.skip('renders navigation links', () => {});

  it.skip('renders menu button', () => {});

  it.skip('renders logout button', () => {});

  it.skip('toggles navigation when menu button is clicked', () => {
    // Test case to check if navigation toggles when menu button is clicked
  });

  it.skip('logs out user when logout button is clicked', () => {
    // it case to check if user is logged out when logout button is clicked
  });

  it.skip('renders correct navigation links based on authentication status', () => {
    // it case to check if navigation links render correctly based on authentication status
  });

  it.skip('redirects to homepage after logout', () => {
    // it case to check if user is redirected to homepage after logout
  });

  it.skip('updates navigation links when authentication status changes', () => {
    // Test case to check if navigation links update when authentication status changes
  });
});
