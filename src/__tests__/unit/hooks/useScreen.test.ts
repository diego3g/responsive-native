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
});
