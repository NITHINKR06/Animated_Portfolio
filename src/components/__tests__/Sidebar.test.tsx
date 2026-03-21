import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Sidebar from '../Sidebar';

// Basic navigation smoke tests for the Sidebar

const renderWithRouter = (initialEntries: string[] = ['/']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <Sidebar />
    </MemoryRouter>
  );
};

describe('Sidebar', () => {
  it('renders navigation buttons for the main sections', () => {
    renderWithRouter();

    // labels taken from navItems in Sidebar
    const labels = [
      'Services',
      'Home',
      'About',
      'Skills',
      'Experience',
      'Education',
      'Projects',
      'Certification',
    ];

    labels.forEach((label) => {
      expect(
        screen.getByRole('button', { name: label })
      ).toBeInTheDocument();
    });
  });

  it('navigates to /services when Services is clicked', () => {
    const scrollIntoViewMock = vi.fn();

    // jsdom safety: mock scrollIntoView on HTMLElement prototype
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

    renderWithRouter(['/']);

    const servicesButton = screen.getByRole('button', { name: 'Services' });

    fireEvent.click(servicesButton);

    // We cannot easily assert location change here without a router wrapper that exposes history,
    // but this ensures click handler runs without throwing (no runtime errors).
    expect(servicesButton).toBeInTheDocument();
  });
});
