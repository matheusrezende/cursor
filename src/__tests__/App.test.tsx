import { describe, it, expect } from 'vitest';
import { render, screen } from '../test/test.util';
import App from '../App';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    // Use a more specific query with exact match
    const header = screen.getByRole('heading', { level: 1 });
    expect(header).toBeDefined();
  });
});
