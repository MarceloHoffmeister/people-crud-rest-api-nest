export const mockService = jest.fn(() => ({
  create: jest.fn((entity) => entity),
}));
