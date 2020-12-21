
export interface ResourceReader<T> {
  read: () => T;
}

export function createResource<T>(asyncFn: () => Promise<T>): ResourceReader<T> {
  let state = 'pending';
  let result: T;
  let promise = asyncFn()
    .then((data) => {
      state = 'done';
      result = data;
    })
    .catch((error) => {
      state = 'error';
      result = error;
    });

  return {
    read() {
      if (state === 'pending')
        throw promise;
      if (state === 'error')
        throw result;
      return result;
    }
  };
}
