import { getDeviceHeight } from '../../../utils/getDeviceHeight';
import { isIPhoneX } from '../../../utils/isIPhoneX';
import { getStatusBarOffset } from '../../../utils/getStatusBarOffset';
import { mocked } from 'ts-jest/utils';

jest.mock('../../../utils/isIPhoneX');
jest.mock('../../../utils/getStatusBarOffset');
const mockedIsIPhoneX = mocked(isIPhoneX, true);
const mockedGetStatusBarOffset = mocked(getStatusBarOffset, true);

describe('Utils | getDeviceHeight', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  afterAll(() => {
    jest.resetModules();
  });

  it("should return 'standardLength - statusBarOffset' if is an android device", () => {
    const STANDARD_LENGTH = 1001;
    const STATUS_BAR_HEIGHT = 100;

    jest.mock('react-native/Libraries/Utilities/Platform', () => ({
      OS: 'android',
    }));

    jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
      get: jest
        .fn()
        .mockReturnValue({ height: STANDARD_LENGTH, width: STANDARD_LENGTH }),
    }));

    mockedIsIPhoneX.mockImplementationOnce(() => {
      return false;
    });

    mockedGetStatusBarOffset.mockImplementationOnce(() => {
      return STATUS_BAR_HEIGHT;
    });

    expect(getDeviceHeight()).toBe(STANDARD_LENGTH - STATUS_BAR_HEIGHT);
  });

  it("should return 'standardLength - statusBarOffset' if is an iPhoneX device", () => {
    const STANDARD_LENGTH = 100;
    const STATUS_BAR_HEIGHT = 1;

    jest.mock('react-native/Libraries/Utilities/Platform', () => ({
      OS: 'ios',
    }));

    jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
      get: jest
        .fn()
        .mockReturnValue({ height: STANDARD_LENGTH, width: STANDARD_LENGTH }),
    }));

    mockedIsIPhoneX.mockImplementationOnce(() => {
      return true;
    });

    mockedGetStatusBarOffset.mockImplementationOnce(() => {
      return STATUS_BAR_HEIGHT;
    });

    expect(getDeviceHeight()).toBe(STANDARD_LENGTH - STATUS_BAR_HEIGHT);
  });

  it("should return 'standardLength' if is a device without floating statusBar", () => {
    const STANDARD_LENGTH = 10;
    const STATUS_BAR_HEIGHT = 5;

    jest.mock('react-native/Libraries/Utilities/Platform', () => ({
      OS: 'windows',
    }));

    jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
      get: jest
        .fn()
        .mockReturnValue({ height: STANDARD_LENGTH, width: STANDARD_LENGTH }),
    }));

    mockedIsIPhoneX.mockImplementationOnce(() => {
      return false;
    });

    mockedGetStatusBarOffset.mockImplementationOnce(() => {
      return STATUS_BAR_HEIGHT;
    });

    expect(getDeviceHeight()).toBe(STANDARD_LENGTH);
  });
});
