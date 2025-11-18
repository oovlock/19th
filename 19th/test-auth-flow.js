// Simple test to verify the auth flow components
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AppProvider } from '../src/hooks';
import AuthModal from '../src/components/AuthModal';
import SeedAnimation from '../src/components/SeedAnimation';

// Mock the canvas context
HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
  clearRect: jest.fn(),
  save: jest.fn(),
  restore: jest.fn(),
  translate: jest.fn(),
  scale: jest.fn(),
  beginPath: jest.fn(),
  fill: jest.fn(),
  stroke: jest.fn(),
  ellipse: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  quadraticCurveTo: jest.fn(),
  arc: jest.fn(),
  globalAlpha: 1,
  fillStyle: '',
  strokeStyle: '',
  lineWidth: 1,
})) as any;

describe('Auth Flow Components', () => {
  test('AuthModal renders correctly', () => {
    const onSuccess = jest.fn();
    
    render(
      <AppProvider>
        <AuthModal onSuccess={onSuccess} />
      </AppProvider>
    );

    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Unlock' })).toBeInTheDocument();
  });

  test('AuthModal shows error for incorrect password', async () => {
    const onSuccess = jest.fn();
    
    render(
      <AppProvider>
        <AuthModal onSuccess={onSuccess} />
      </AppProvider>
    );

    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: 'Unlock' });

    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Incorrect password. Please try again.')).toBeInTheDocument();
    });

    expect(onSuccess).not.toHaveBeenCalled();
  });

  test('AuthModal calls onSuccess for correct password', async () => {
    const onSuccess = jest.fn();
    
    render(
      <AppProvider>
        <AuthModal onSuccess={onSuccess} />
      </AppProvider>
    );

    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: 'Unlock' });

    fireEvent.change(passwordInput, { target: { value: '161104' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalled();
    }, { timeout: 1000 });
  });

  test('SeedAnimation renders and completes', async () => {
    const onComplete = jest.fn();
    
    render(
      <AppProvider>
        <SeedAnimation onComplete={onComplete} />
      </AppProvider>
    );

    expect(screen.getByText('A Seed Planted')).toBeInTheDocument();
    
    // Animation should complete after 3 seconds
    await waitFor(() => {
      expect(onComplete).toHaveBeenCalled();
    }, { timeout: 4000 });
  });
});