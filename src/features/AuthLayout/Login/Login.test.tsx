import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Login from './Login';

const mockStore = configureStore([]);
const store = mockStore({
  auth: {
    isLoading: false,
  },
});

describe('Login Component', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
  });

  test('should display required error when email is not provided', async () => {
    fireEvent.submit(screen.getByRole('button', { name: /login/i }));

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
  });

  test('should display invalid email error when email format is incorrect', async () => {
    fireEvent.input(screen.getByLabelText(/email/i), {
      target: { value: 'invalid-email' },
    });
    fireEvent.submit(screen.getByRole('button', { name: /login/i }));

    expect(await screen.findByText(/invalid email/i)).toBeInTheDocument();
  });

  test('should display required error when password is not provided', async () => {
    fireEvent.submit(screen.getByRole('button', { name: /login/i }));

    expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
  });

  test('should not display error when email and password are valid', async () => {
    fireEvent.input(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.input(screen.getByPlaceholderText(/enter your password/i), {
      target: { value: 'password123' },
    });
    fireEvent.submit(screen.getByRole('button', { name: /login/i }));

    expect(screen.queryByText(/email is required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/invalid email/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/password is required/i)).not.toBeInTheDocument();
  });
});
