import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';

// Extend Vitest's expect with testing-library matchers
expect.extend(matchers as any);

// Clean up after each test
afterEach(() => {
  cleanup();
}); 