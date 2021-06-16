import { getNearestBreakpoint } from '../../../utils/getNearestBreakpoint';

describe('Utils | getNearestBreakpoint', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  afterAll(() => {
    jest.resetModules();
  });

  it("should return 'undefined' when availableBreakpoints are empty", () => {
    expect(
      getNearestBreakpoint({
        breakpoint: 'xlg',
        availableBreakpoints: [],
      })
    ).toBeUndefined();
  });

  it('should return the nearest breakpoint', () => {
    expect(
      getNearestBreakpoint({
        breakpoint: 'xlg',
        availableBreakpoints: ['sm', 'lg', 'md', 'xlg'],
      })
    ).toBe('lg');

    expect(
      getNearestBreakpoint({
        breakpoint: 'lg',
        availableBreakpoints: ['sm', 'lg', 'md', 'xlg'],
      })
    ).toBe('md');

    expect(
      getNearestBreakpoint({
        breakpoint: 'md',
        availableBreakpoints: ['sm', 'lg', 'md', 'xlg'],
      })
    ).toBe('sm');
  });
});
