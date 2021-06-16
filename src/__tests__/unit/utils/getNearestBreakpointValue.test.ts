import { getNearestBreakpointValue } from '../../../utils/getNearestBreakpointValue';

describe('Utils | getNearestBreakpointValue', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  afterAll(() => {
    jest.resetModules();
  });

  it('should return the breakpoint value', () => {
    expect(
      getNearestBreakpointValue({
        values: { sm: 100, base: 50 },
        breakpoint: 'sm',
      })
    ).toBe(100);
  });

  it('should return the nearest breakpoint value when the breakpoint has no value', () => {
    expect(
      getNearestBreakpointValue({
        values: { sm: 100, md: undefined, base: 50 },
        breakpoint: 'md',
      })
    ).toBe(100);
  });

  it("should return the base breakpoint value when the breakpoint doesn't exist", () => {
    expect(
      getNearestBreakpointValue({
        values: { base: 50 },
        breakpoint: 'sm',
      })
    ).toBe(50);
  });

  it("should return the base breakpoint value when the breakpoint doesn't have the nearest breakpoint", () => {
    expect(
      getNearestBreakpointValue({
        values: { sm: undefined, base: 50 },
        breakpoint: 'sm',
      })
    ).toBe(50);
  });
});
