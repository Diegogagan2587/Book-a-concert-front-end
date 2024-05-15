import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux'; // import the provider
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../redux/store';
import Login from './Login';

const LOGIN_URL = 'http://127.0.0.1:3001/login'
const server = setupServer(
  http.post(LOGIN_URL, async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return HttpResponse.json({
      status: { code: 200, message: 'Signed up successfully.' },
      data:{
        status: {
          token: 'token1234',
        },
        attributes: {
          id: '12',
          email: 'luffy@mail.com',
          name: 'luffy',
        },
      },
    });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('Login Page Should display a Login button and BOOK A CONCERT APP text', () => {
  render(
    <Provider store={store}>
      <Router>
        <Login />
      </Router>
    </Provider>
  );
  const button = screen.getByText('Login');
  const textElement = screen.getByText('BOOK A CONCERT APP');
  expect(button).toBeInTheDocument();
  expect(textElement).toBeInTheDocument();
});

test("Click on Login should show 'loading' when fetching user data", async () => {
  // Arrange
  render(
    <Provider store={store}>
      <Router>
        <Login />
      </Router>
    </Provider>
  );
  // Act
  const loginBtn = screen.getByText('Login');
  await userEvent.click(loginBtn);
  const loading = screen.getByText('Loading...');
  // Assert
  expect(loading).toBeInTheDocument();
});

test('After successful login, user should be redirected to homepage', async () => {
  // Arrange
  render(
   <Provider store={store}>
     <Router>
       <Login />
     </Router>
   </Provider>
 );
 // Act
 const loginBtn = screen.getByText('Login');
 await userEvent.click(loginBtn);
 // Assert
 expect(window.location.pathname).toBe('/');
});

test('After failed login, error message should be displayed', async () => {
  // Arrange
  server.use(
    http.post(LOGIN_URL, async () => {
      return HttpResponse.json(null, { status: 500 });
    })
  );
  render(
    <Provider store={store}>
      <Router>
        <Login />
      </Router>
    </Provider>
  );
    // Act
    const loginBtn = screen.getByText('Login');
    await userEvent.click(loginBtn);

    // Assert
    const errorMessage = await screen.findByText('User not found');
    expect(errorMessage).toBeInTheDocument();
});
