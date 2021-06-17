import { renderHook } from '@testing-library/react-hooks/native';

import { useMediaQuery } from '../../../hooks/useMediaQuery';

import { WrapperProvider } from '../../__mocks__/Wrapper';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { mocked } from 'ts-jest/utils';

jest.mock('react-native-safe-area-context');
const mockedUseSafeAreaInsets = mocked(useSafeAreaInsets, true);

describe('Hooks | useMediaQuery', () => {
  beforeEach(() => {
    jest.resetModules();

    mockedUseSafeAreaInsets.mockImplementation(() => ({
      bottom: 0,
      left: 0,
      right: 0,
      top: 0,
    }));
  });

  afterAll(() => {
    jest.resetModules();
  });

  it("should return 'false' if platform is different from device's platform", () => {
    jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
      get: jest.fn().mockReturnValue({ height: 10, width: 600 }),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));

    jest.mock('react-native/Libraries/Utilities/Platform', () => ({
      OS: 'macos',
    }));

    const { result } = renderHook(
      () => useMediaQuery({ platform: 'android' }),
      {
        wrapper: WrapperProvider,
      }
    );

    expect(result.current).toBe(false);
  });

  it("should return 'true' if platform is the same as the device's platform", () => {
    jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
      get: jest.fn().mockReturnValue({ height: 10, width: 600 }),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));

    jest.mock('react-native/Libraries/Utilities/Platform', () => ({
      OS: 'windows',
    }));

    const { result } = renderHook(
      () => useMediaQuery({ platform: 'windows' }),
      {
        wrapper: WrapperProvider,
      }
    );

    expect(result.current).toBe(true);
  });

  it("should return 'false' if minBreakpoint is bigger than current breakpoint", () => {
    jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
      get: jest.fn().mockReturnValue({ height: 10, width: 10 }),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));

    const { result } = renderHook(
      () => useMediaQuery({ minBreakpoint: 'md' }),
      {
        wrapper: WrapperProvider,
      }
    );

    expect(result.current).toBe(false);
  });

  it("should return 'true' if minBreakpoint is lower or equal than current breakpoint", () => {
    jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
      get: jest.fn().mockReturnValue({ height: 10, width: 10 }),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));

    const { result } = renderHook(
      () => useMediaQuery({ minBreakpoint: 'sm' }),
      {
        wrapper: WrapperProvider,
      }
    );

    expect(result.current).toBe(true);
  });

  it("should return 'true' if maxBreakpoint is bigger than current breakpoint", () => {
    jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
      get: jest.fn().mockReturnValue({ height: 10, width: 10 }),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));

    const { result } = renderHook(
      () => useMediaQuery({ maxBreakpoint: 'md' }),
      {
        wrapper: WrapperProvider,
      }
    );

    expect(result.current).toBe(true);
  });

  it("should return 'false' if maxBreakpoint is lower than current breakpoint", () => {
    jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
      get: jest.fn().mockReturnValue({ height: 10, width: 1000 }),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));

    const { result } = renderHook(
      () => useMediaQuery({ maxBreakpoint: 'sm' }),
      {
        wrapper: WrapperProvider,
      }
    );

    expect(result.current).toBe(false);
  });
});
