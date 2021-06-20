import { renderHook } from '@testing-library/react-hooks/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { mocked } from 'ts-jest/utils';

import { useRem } from '../../../hooks/useRem';

import { WrapperProvider } from '../../__mocks__/Wrapper';

jest.mock('react-native-safe-area-context');
const mockedUseSafeAreaInsets = mocked(useSafeAreaInsets, true);

describe('Hooks | useRem', () => {
  beforeAll(() => {
    jest.resetModules();

    mockedUseSafeAreaInsets.mockReturnValue({
      bottom: 0,
      top: 0,
      left: 0,
      right: 0,
    });

    jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
      get: jest
        .fn()
        .mockReturnValue({ height: 1000, width: 1000, fontScale: 2 }),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));
  });

  afterAll(() => {
    jest.resetModules();
  });

  it("should convert 'px' to 'rem' with default config", () => {
    const { result } = renderHook(() => useRem(), {
      wrapper: WrapperProvider,
    });

    expect(result.current(12)).toBe(282);
    expect(result.current(16)).toBe(376);
    expect(result.current(18)).toBe(424);
    expect(result.current(20)).toBe(471);
  });

  it("should convert 'px' to 'rem' with baseFontSize", () => {
    const { result, rerender } = renderHook(() => useRem(), {
      wrapper: WrapperProvider as any,
      initialProps: {
        baseFontSize: 1,
      },
    });

    expect(result.current(10)).toBe(15);

    rerender({ baseFontSize: 4 });
    expect(result.current(10)).toBe(59);

    rerender({ baseFontSize: 8 });
    expect(result.current(10)).toBe(118);

    rerender({ baseFontSize: 16 });
    expect(result.current(10)).toBe(235);
  });

  it("should convert 'px' to 'rem' with fontScaleFactor when shouldScale is 'true'", () => {
    const { result } = renderHook(() => useRem(), {
      wrapper: WrapperProvider,
    });

    expect(result.current(10)).toBe(235);
    expect(result.current(10, true)).toBe(470);
  });
});
