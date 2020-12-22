import { createResource } from "./resource"

describe('createResource', () => {
  const flushPromises = () => new Promise(setImmediate);

  it('should return object with read method', () => {
    const resource = createResource(() => new Promise(() => { }));

    expect(typeof resource).toBe('object');
    expect(Object.keys(resource)).toEqual(['read']);
    expect(typeof resource.read).toBe('function');
  });

  it('should throw promise when promise is pending', () => {
    const promise = new Promise<void>(() => { });
    const resource = createResource(() => promise);
    let thrownError;

    try {
      resource.read();
    } catch (error) {
      thrownError = error;
    }

    expect(thrownError).toEqual(promise);
  });

  it('should return resolved value when promise is fulfilled', async () => {
    let resolver: (value: string) => void;
    const promise = new Promise((resolve) => { resolver = resolve });
    const resource = createResource(() => promise);

    resolver!('test');
    await flushPromises();

    expect(resource.read()).toEqual('test');
  });

  it('should throw error when promise is rejected', async () => {
    let rejecter: (error: any) => void;
    const promise = new Promise((_resolve, reject) => { rejecter = reject });
    const resource = createResource(() => promise);

    rejecter!('test');
    await flushPromises();

    expect(() => resource.read()).toThrow('test');
  });
});
