import { render, screen } from '@testing-library/react';
import App from './App';

test('renders top navigation and upload controls', () => {
  render(<App />);
  // Top nav should have brand
  expect(screen.getByText(/OSN Stream Manager/i)).toBeInTheDocument();
  // Theme toggle button
  expect(screen.getByRole('button', { name: /toggle/i })).toBeInTheDocument();
  // Navigate to Uploads
  expect(screen.getByRole('button', { name: /Uploads/i })).toBeInTheDocument();
});
