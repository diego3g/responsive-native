import { renderHook } from '@testing-library/react-hooks/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { mocked } from 'ts-jest/utils';

import { useScreen } from '../../../hooks/useScreen';

import { WrapperProvider } from '../../__mocks__/Wrapper';

jest.mock('react-native-safe-area-context');
const mockedUseSafeAreaInsets = mocked(useSafeAreaInsets, true);

describe('Hooks | useScreen', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  afterAll(() => {
    jest.resetModules();
  });

  it("should return 'padding' values from 'safe area insets'", () => {
    const padding = {
      bottom: 1,
      left: 2,
      right: 3,
      top: 4,
    };

    mockedUseSafeAreaInsets.mockImplementation(() => padding);

    const { result } = renderHook(() => useScreen(), {
      wrapper: WrapperProvider,
    });

    expect(result.current.padding).toBe(padding);
  });

  it("should return 'pixelRatio' from react native PixelRatio", () => {
    jest.mock('react-native/Libraries/Utilities/PixelRatio', () => ({
      get: jest.fn().mockReturnValue(10),
    }));

    const { result } = renderHook(() => useScreen(), {
      wrapper: WrapperProvider,
    });

    expect(result.current.pixelRatio).toBe(10);
  });

  it("should return 'baseFontSize' provided from ScreenProvider prop", () => {
    const { result } = renderHook(() => useScreen(), {
      wrapper: WrapperProvider as any,
      initialProps: { baseFontSize: 3 },
    });

    expect(result.current.baseFontSize).toBe(3);
  });

  it("should return 'fontScaleFactor' from react native Dimensions", () => {
    jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
      get: jest.fn().mockReturnValue({ fontScale: 2 }),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));

    const { result } = renderHook(() => useScreen(), {
      wrapper: WrapperProvider,
    });

    expect(result.current.fontScaleFactor).toBe(2);
  });

  it("should return the current 'breakpoint'", () => {
    jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
      get: jest.fn().mockReturnValue({ width: 900 }),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));

    const { result } = renderHook(() => useScreen(), {
      wrapper: WrapperProvider,
    });

    expect(result.current.breakpoint.size).toBe('lg');
  });
});
