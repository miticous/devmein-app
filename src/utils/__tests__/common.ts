import { common } from 'utils/common';

describe('Testing common utils', () => {
  it('Should prettify object keys correctly', () => {
    const obj = {
      testing_here: '123',
      testing: '1234',
      testing_testing: '12345',
    };

    const data = common.prettifyObjectKeys(obj);

    expect(Object.keys(data).some(key => key.includes('_'))).toBeFalsy();
    expect(data).toEqual({
      testingHere: '123',
      testing: '1234',
      testingTesting: '12345',
    });
  });
});
