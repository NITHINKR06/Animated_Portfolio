import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Sidebar } from '../Sidebar';

const renderWithRouter = (initialEntries: string[] = ['/']) =>
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <Sidebar />
    </MemoryRouter>,
  );

describe('Sidebar', () => {
  it('renders navigation buttons for all main sections', () => {
    renderWithRouter();
    [
      'Services',
      'Home',
      'About',
      'Skills',
      'Experience',
      'Education',
      'Projects',
      'Certification',
    ].forEach((label) => {
      expect(screen.getByRole('button', { name: label })).toBeInTheDocument();
    });
  });

  it('Services button click runs without throwing', () => {
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
    renderWithRouter(['/']);
    fireEvent.click(screen.getByRole('button', { name: 'Services' }));
    expect(screen.getByRole('button', { name: 'Services' })).toBeInTheDocument();
  });

  it('renders correctly when on /projects/:id route', () => {
    renderWithRouter(['/projects/walrus']);
    // Sidebar should still render all nav items on project detail route
    expect(screen.getByRole('button', { name: 'Projects' })).toBeInTheDocument();
  });
});
