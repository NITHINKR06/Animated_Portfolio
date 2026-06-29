import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Skills } from '../Skills';
import { portfolioData } from '../../data/portfolio';

// Basic smoke/interaction tests for the Skills section

describe('Skills', () => {
  it('renders the Skills & Expertise heading', () => {
    render(<Skills />);

    expect(screen.getByRole('heading', { name: /skills & expertise/i })).toBeInTheDocument();
  });

  it('renders category tabs from portfolio data and switches active category', () => {
    render(<Skills />);

    const firstCategory = portfolioData.skills[0].category;
    const secondCategory = portfolioData.skills[1].category;

    const firstTab = screen.getByRole('button', { name: firstCategory });
    const secondTab = screen.getByRole('button', { name: secondCategory });

    // both tabs should be visible
    expect(firstTab).toBeInTheDocument();
    expect(secondTab).toBeInTheDocument();

    // click second category and ensure it can be activated (no crash)
    fireEvent.click(secondTab);
  });
});
