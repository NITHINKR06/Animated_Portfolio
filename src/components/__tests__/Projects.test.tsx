import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Projects } from '../Projects';
import { portfolioData } from '../../data/portfolio';

// Light regression tests for the Projects grid

describe('Projects', () => {
  it('renders the Projects heading and subtitle', () => {
    render(<Projects />);

    expect(
      screen.getByRole('heading', { name: /my projects/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/things i've built — newest first/i)
    ).toBeInTheDocument();
  });

  it('renders a card for each project in portfolio data', () => {
    render(<Projects />);

    const titles = portfolioData.projects.map((p) => p.title);

    titles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });
});
