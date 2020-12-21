import { randomTitle } from "./randomTitle";

describe('randomTitle', () => {
  let randomValue = 0;

  beforeEach(() => {
    jest.spyOn(global.Math, 'random').mockImplementation(() => randomValue);
  });

  afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
  });

  describe('given three titles', () => {
    const titles = ['Pulp Fiction', 'Men in Black', 'I, Robot'];

    describe('when randomized value is 0', () => {
      it('should return first element of array', () => {
        expect(randomTitle(titles)).toBe('Pulp Fiction');
      });
    });

    describe('when randomized value is close to 1', () => {
      beforeEach(() => {
        randomValue = 0.999999999;
      });

      it('should return last element of array', () => {
        expect(randomTitle(titles)).toBe('I, Robot');
      });
    });

    describe('when randomized value is in the middle', () => {
      beforeEach(() => {
        randomValue = 0.5;
      });

      it('should return middle element of array', () => {
        expect(randomTitle(titles)).toBe('Men in Black');
      });
    });
  });
});
