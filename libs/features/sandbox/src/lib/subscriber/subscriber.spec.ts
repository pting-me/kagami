import subscriber from './subscriber';

describe('subscriber', () => {
  it('sample', () => {
    expect(subscriber(null, null)).toBe('subscriber');
  });
});
