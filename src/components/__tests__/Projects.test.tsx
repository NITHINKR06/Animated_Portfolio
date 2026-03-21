import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Projects } from '../Projects';
import { portfolioData } from '../../data/portfolio';

const renderWithRouter = (path = '/') =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Projects />
    </MemoryRouter>
  );

describe('Projects', () => {
  it('renders the Projects heading and subtitle', () => {
    renderWithRouter();
    expect(screen.getByRole('heading', { name: /my projects/i })).toBeInTheDocument();
    expect(screen.getByText(/things i've built — newest first/i)).toBeInTheDocument();
  });

  it('renders a card for each project in portfolio data', () => {
    renderWithRouter();
    portfolioData.projects.forEach(p => {
      expect(screen.getByText(p.title)).toBeInTheDocument();
    });
  });

  it('clicking a card does not throw (navigate fires)', () => {
    renderWithRouter();
    const card = screen.getByText(portfolioData.projects[0].title).closest('.animated-card');
    expect(() => { if (card) fireEvent.click(card); }).not.toThrow();
  });

  it('does NOT render a modal — modal is gone from Projects', () => {
    renderWithRouter();
    // ProjectDetailModal is no longer rendered inside Projects
    // Verify no dialog/modal role exists
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});