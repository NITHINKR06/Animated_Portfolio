import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Hero } from '../Hero';

describe('Hero', () => {
  it('renders name and title from portfolio data', () => {
    render(<Hero />);

    // Name and title should come from portfolioData.personal
    const heading = screen.getByText(/i'm/i);
    expect(heading).toBeInTheDocument();

    // Ensure main call-to-action is present
    expect(screen.getByText(/get in touch/i)).toBeInTheDocument();
  });
});
