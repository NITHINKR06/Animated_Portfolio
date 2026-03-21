import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Hero } from '../Hero';
import { portfolioData } from '../../data/portfolio';

describe('Hero', () => {
  it("renders the developer's name from portfolio data", () => {
    render(<Hero />);

    expect(screen.getByText(portfolioData.personal.name)).toBeInTheDocument();
  });

  it('renders the View Resume button', () => {
    render(<Hero />);

    expect(screen.getByRole('button', { name: /view resume/i })).toBeInTheDocument();
  });

  it('calls onResumeClick when provided and button is clicked', () => {
    const handleResumeClick = vi.fn();

    render(<Hero onResumeClick={handleResumeClick} />);

    const button = screen.getByRole('button', { name: /view resume/i });
    fireEvent.click(button);

    expect(handleResumeClick).toHaveBeenCalledTimes(1);
  });
});
