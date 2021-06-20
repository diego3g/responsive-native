import { isIPhoneX } from '../../../utils/isIPhoneX';

describe('Utils | isIPhoneX', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  afterAll(() => {
    jest.resetModules();
  });

  it("should return 'false' if is an android device", () => {
    jest.mock('react-native/Libraries/Utilities/Platform', () => ({
      OS: 'android',
    }));

    expect(isIPhoneX()).toBe(false);
  });

  it("should return 'false' if is an iPad device", () => {
    jest.mock('react-native/Libraries/Utilities/Platform', () => ({
      OS: 'ios',
      isPad: true,
      isTVOS: false,
    }));

    expect(isIPhoneX()).toBe(false);
  });

  it("should return 'false' if is an isTVOS device", () => {
    jest.mock('react-native/Libraries/Utilities/Platform', () => ({
      OS: 'ios',
      isTVOS: true,
      isPad: false,
    }));

    expect(isIPhoneX()).toBe(false);
  });

  it("should return 'false' if no has an iPhoneX dimension", () => {
    jest.mock('react-native/Libraries/Utilities/Platform', () => ({
      OS: 'ios',
    }));

    jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
      get: jest.fn().mockReturnValue({ height: 100, width: 100 }),
    }));

    expect(isIPhoneX()).toBe(false);
  });

  it("should return 'true' if has an iPhoneX dimension", () => {
    jest.mock('react-native/Libraries/Utilities/Platform', () => ({
      OS: 'ios',
    }));

    jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
      get: jest.fn().mockReturnValue({ height: 780, width: 780 }),
    }));

    expect(isIPhoneX()).toBe(true);
  });
});
