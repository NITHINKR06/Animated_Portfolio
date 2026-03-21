import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Hero } from '../Hero';

// Small accessibility/regression checks for the Hero section

describe('Hero accessibility and content', () => {
  it('renders a mailto link for Get In Touch', () => {
    render(<Hero />);

    const contactLink = screen.getByRole('link', { name: /get in touch/i });
    expect(contactLink).toBeInTheDocument();
    expect(contactLink).toHaveAttribute('href');
    expect(contactLink.getAttribute('href')).toMatch(/^mailto:/);
  });

  it('renders social links to GitHub and LinkedIn', () => {
    render(<Hero />);

    const links = screen.getAllByRole('link');
    const hrefs = links.map((link) => link.getAttribute('href'));

    expect(hrefs.some((href) => href?.includes('github.com'))).toBe(true);
    expect(hrefs.some((href) => href?.includes('linkedin.com'))).toBe(true);
  });
});
