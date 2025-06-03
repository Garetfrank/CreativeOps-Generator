const handler = require('./route');

describe('/api/script', () => {
  it('should have a POST handler', () => {
    expect(typeof handler.POST).toBe('function');
  });
}); 