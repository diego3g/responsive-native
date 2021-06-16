import { getStatusBarOffset } from '../../../utils/getStatusBarOffset';

describe('Utils | getStatusBarOffset', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  afterAll(() => {
    jest.resetModules();
  });

  it("should return '0' if device is in 'landscape' mode", () => {
    jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
      get: jest.fn().mockReturnValue({ height: 100, width: 200 }),
    }));

    expect(getStatusBarOffset()).toBe(0);
  });

  it('should return iPhone statusBar height if device is an iPhone', () => {
    jest.mock('react-native/Libraries/Utilities/Platform', () => ({
      OS: 'ios',
    }));

    jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
      get: jest.fn().mockReturnValue({ height: 200, width: 100 }),
    }));

    expect(getStatusBarOffset()).toBe(78);
  });

  it("should return 'StatusBar.currentHeight' if device is an android", () => {
    jest.mock('react-native/Libraries/Utilities/Platform', () => ({
      OS: 'android',
    }));

    jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
      get: jest.fn().mockReturnValue({ height: 200, width: 100 }),
    }));

    jest.mock('react-native/Libraries/Components/StatusBar/StatusBar', () => ({
      currentHeight: 1,
    }));

    expect(getStatusBarOffset()).toBe(1);
  });
});
