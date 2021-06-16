import { validateMediaQuery } from '../../../utils/validateMediaQuery';

describe('Utils | validateMediaQuery', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  afterAll(() => {
    jest.resetModules();
  });

  it("should throw an exception when provide a breakpoint without 'currentBreakpoint'", () => {
    expect(() => validateMediaQuery({ minBreakpoint: 'md' })).toThrow(
      'Media Query should include current breakpoint.'
    );
  });

  it("should return 'true' if no params as provided", () => {
    expect(validateMediaQuery({})).toBe(true);
  });

  it("should return 'false' if platform is different from device platform", () => {
    jest.mock('react-native/Libraries/Utilities/Platform', () => ({
      OS: 'macos',
    }));

    expect(validateMediaQuery({ platform: 'ios' })).toBe(false);
    jest.resetModules();
  });

  it("should return 'true' if platform is the same as the device's platform", () => {
    jest.mock('react-native/Libraries/Utilities/Platform', () => ({
      OS: 'windows',
    }));

    expect(validateMediaQuery({ platform: 'windows' })).toBe(true);
  });

  it("should return 'false' if minBreakpoint is bigger than current breakpoint", () => {
    expect(
      validateMediaQuery({ minBreakpoint: 'lg', currentBreakpoint: 'sm' })
    ).toBe(false);
  });

  it("should return 'true' if minBreakpoint is lower than current breakpoint", () => {
    expect(
      validateMediaQuery({ minBreakpoint: 'lg', currentBreakpoint: 'xlg' })
    ).toBe(true);
  });

  it("should return 'true' if maxBreakpoint is bigger than current breakpoint", () => {
    expect(
      validateMediaQuery({ maxBreakpoint: 'lg', currentBreakpoint: 'sm' })
    ).toBe(true);
  });

  it("should return 'false' if maxBreakpoint is lower than current breakpoint", () => {
    expect(
      validateMediaQuery({ maxBreakpoint: 'lg', currentBreakpoint: 'xlg' })
    ).toBe(false);
  });
});
