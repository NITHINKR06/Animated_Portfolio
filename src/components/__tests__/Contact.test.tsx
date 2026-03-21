import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Contact from '../Contact';

describe('Contact', () => {
  it("shows the main 'Let's Connect' heading", () => {
    render(<Contact />);

    expect(screen.getByText(/let's connect/i)).toBeInTheDocument();
    expect(screen.getByText(/available for work/i)).toBeInTheDocument();
  });
});
