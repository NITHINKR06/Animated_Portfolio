import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Projects } from '../Projects';

describe('Projects', () => {
  it('renders the projects section heading', () => {
    render(<Projects />);

    expect(screen.getByText(/my/i)).toBeInTheDocument();
    expect(screen.getByText(/things i've built/i)).toBeInTheDocument();
  });
});
