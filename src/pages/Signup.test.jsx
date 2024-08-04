import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import store  from '../redux/store';
import Signup from './Signup';

// eslint-disable-next-line no-undef
const API_URL_BASE = process.env.VITE_API_URL_BASE;
const SIGNUP_URL = `${API_URL_BASE}/signup`;
const server = setupServer(
  http.post(SIGNUP_URL, async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return HttpResponse.json({
      status: { code: 200, message: 'Signed up successfully.' },
      data: {},
    })
  })
)

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Signup Component', () => {
  it('renders without crashing', () => {
    render( 
        <Provider store={store}>
          <Signup />
        </Provider>
    );
  });

  it('allows users to input name', async () => {
    // Arrange
    render( 
      <Provider store={store}>
        <Signup />
      </Provider>
  );
  // Act
  const nameInput = screen.getByPlaceholderText('Username');
  await userEvent.type(nameInput, 'Luffy');
  // Assert
  expect(nameInput).toHaveValue('Luffy');
  });

  it('allows users to input email', async () => {
    // Arrange
    render(
      <Provider store={store}>
        <Signup />
      </Provider>
    )
    // Act
    const emailInput = screen.getByPlaceholderText('Email@example.com');
    await userEvent.type(emailInput, "luffy@pirateking.com");
    // Assert
    expect(emailInput).toHaveValue('luffy@pirateking.com');
  });

  it('allows users to input password', async () => {
    // Arrange
    render(
    <Provider store={store}>
      <Signup />
    </Provider>
    )
    // Act
    const passwordInput = screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, "pirateKing123");
    // Assert
    expect(passwordInput).toHaveValue("pirateKing123");
  });

  it('displays loading component when userStatus is loading', async () => {
    // Arrange
    render(
      <Provider store={store}>
        <Signup />
      </Provider>
    );
    // Act
    const signupBtn = screen.getByText('Signup');
    await userEvent.click(signupBtn);
    const loading = screen.getByText('Loading...');
    // Assert
    expect(loading).toBeInTheDocument();
  });

  it('displays error message when registration fails', async () => {
    // Arrange
    server.use(
      http.post(SIGNUP_URL, async () => {
        return HttpResponse.json({
          status: { message: "User couldn't be created succesfully." }
        });
      })
    );
    render(
      <Provider store={store}>
        <Signup />
      </Provider>
    );
    // Act
    const signupBtn = screen.getByText('Signup');
    const nameInput = screen.getByPlaceholderText('Username');
    const emailInput = screen.getByPlaceholderText('Email@example.com');
    const passwordInput = screen.getByPlaceholderText('Password');
    await userEvent.type(nameInput, 'Luffy');
    await userEvent.type(emailInput, 'luffy@mail.com');
    await userEvent.type(passwordInput, 'pirateKing');
    await userEvent.click(signupBtn);
    const errorMessage = await screen.findByText("User couldn't be created succesfully.");
    // Assert
    expect(errorMessage).toBeInTheDocument();
  });

  it('displays success message when registration succeeds', async () => {
        // Arrange
        render(
          <Provider store={store}>
            <Signup />
          </Provider>
        );
        // Act
        const signupBtn = screen.getByText('Signup');
        const nameInput = screen.getByPlaceholderText('Username');
        const emailInput = screen.getByPlaceholderText('Email@example.com');
        const passwordInput = screen.getByPlaceholderText('Password');
        await userEvent.type(nameInput, 'Luffy');
        await userEvent.type(emailInput, 'luffy@mail.com');
        await userEvent.type(passwordInput, 'pirateKing');
        await userEvent.click(signupBtn);
        const successMessage = await screen.findByText('Signed up successfully.');
        // Assert
        expect(successMessage).toBeInTheDocument();
  });

  it('calls dispatch with correct data when signup button is clicked', async () => {
    // Arrange
    server.use(
      http.post(SIGNUP_URL, async ({ request }) => {
        const  user  = await request.json();
        const { name, email, password } = user.user;
        return HttpResponse.json(
          {
            status: { message: `Registered | name: ${name}, email: ${email}, password: ${password}` },
            data: { user }
          }
        );
      })
    );

    render(
      <Provider store={store}>
        <Signup />
      </Provider>
    );
    // Act
    const signupBtn = screen.getByText('Signup');
    const nameInput = screen.getByPlaceholderText('Username');
    const emailInput = screen.getByPlaceholderText('Email@example.com');
    const passwordInput = screen.getByPlaceholderText('Password');
    await userEvent.type(nameInput, 'Luffy');
    await userEvent.type(emailInput, 'luffy@mail.com');
    await userEvent.type(passwordInput, 'pirateKing');
    await userEvent.click(signupBtn);
    const successMessage = await screen.findByText('Registered | name: Luffy, email: luffy@mail.com, password: pirateKing');
    // Assert
    expect(successMessage).toBeInTheDocument();
  });  
});
