export const mockRepository = jest.fn(() => ({
  save: jest.fn((entity) => entity),
}));
