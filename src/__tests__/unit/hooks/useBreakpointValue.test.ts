import { renderHook } from '@testing-library/react-hooks/native';

import { useBreakpointValue } from '../../../hooks/useBreakpointValue';

import { WrapperProvider } from '../../__mocks__/Wrapper';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { mocked } from 'ts-jest/utils';

jest.mock('react-native-safe-area-context');
const mockedUseSafeAreaInsets = mocked(useSafeAreaInsets, true);

const BP_VALUES = { base: 10, sm: 20, md: 30, lg: 40, xlg: 50 };

describe('Hooks | useBreakpointValue', () => {
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

  it("should return 'base' value when breakpoint value is not provided", () => {
    jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
      get: jest.fn().mockReturnValue({ height: 10, width: 2000 }),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));

    const { result } = renderHook(() => useBreakpointValue({ base: 5 }), {
      wrapper: WrapperProvider,
    });

    expect(result.current).toBe(5);
  });

  it("should return 'sm' value when device width is less or equal '576'", () => {
    jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
      get: jest.fn().mockReturnValue({ height: 10, width: 200 }),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));

    const { result } = renderHook(() => useBreakpointValue(BP_VALUES), {
      wrapper: WrapperProvider,
    });

    expect(result.current).toBe(BP_VALUES.sm);
  });

  it("should return 'md' value when device width is less or equal '768'", () => {
    jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
      get: jest.fn().mockReturnValue({ height: 10, width: 600 }),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));

    const { result } = renderHook(() => useBreakpointValue(BP_VALUES), {
      wrapper: WrapperProvider,
    });

    expect(result.current).toBe(BP_VALUES.md);
  });

  it("should return 'xl' value when device width is less or equal '992'", () => {
    jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
      get: jest.fn().mockReturnValue({ height: 10, width: 800 }),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));

    const { result } = renderHook(() => useBreakpointValue(BP_VALUES), {
      wrapper: WrapperProvider,
    });

    expect(result.current).toBe(BP_VALUES.lg);
  });

  it("should return 'xlg' value when device width is less or equal '1200'", () => {
    jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
      get: jest.fn().mockReturnValue({ height: 10, width: 1000 }),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));

    const { result } = renderHook(() => useBreakpointValue(BP_VALUES), {
      wrapper: WrapperProvider,
    });

    expect(result.current).toBe(BP_VALUES.xlg);
  });

  it("should return 'xlg' value when device width is more then '1200'", () => {
    jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
      get: jest.fn().mockReturnValue({ height: 10, width: 2000 }),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));

    const { result } = renderHook(() => useBreakpointValue(BP_VALUES), {
      wrapper: WrapperProvider,
    });

    expect(result.current).toBe(BP_VALUES.xlg);
  });
});
