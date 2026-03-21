import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Contact from '../Contact';

describe('Contact', () => {
  it('renders the main heading', () => {
    render(<Contact />);

    expect(screen.getByRole('heading', { name: /let's connect/i })).toBeInTheDocument();
  });

  it('shows the availability badge', () => {
    render(<Contact />);

    expect(screen.getByText(/available for work/i)).toBeInTheDocument();
  });

  it('renders email and GitHub contact items', () => {
    render(<Contact />);

    expect(screen.getAllByText(/email/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/github/i)[0]).toBeInTheDocument();
  });
});
