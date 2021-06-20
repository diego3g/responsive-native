import { rem } from '../../../utils/rem';

describe('Utils | Rem', () => {
  beforeAll(() => {
    jest.mock('react-native/Libraries/Utilities/Platform', () => ({
      OS: 'ios',
    }));

    jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
      get: jest.fn().mockReturnValue({ height: 1000, width: 1000 }),
    }));
  });

  afterAll(() => {
    jest.resetModules();
  });

  it("should convert 'px' to 'rem' with default configs", () => {
    expect(rem({ size: 12 })).toBe(282);
    expect(rem({ size: 16 })).toBe(376);
    expect(rem({ size: 18 })).toBe(424);
    expect(rem({ size: 20 })).toBe(471);
  });

  it("should convert 'px' to 'rem' with baseFontSize", () => {
    expect(rem({ size: 10, baseFontSize: 1 })).toBe(15);
    expect(rem({ size: 10, baseFontSize: 4 })).toBe(59);
    expect(rem({ size: 10, baseFontSize: 8 })).toBe(118);
    expect(rem({ size: 10, baseFontSize: 16 })).toBe(235);
  });

  it("should convert 'px' to 'rem' with fontScaleFactor when shouldScale is 'true'", () => {
    expect(rem({ size: 10, fontScaleFactor: 1, shouldScale: true })).toBe(235);
    expect(rem({ size: 10, fontScaleFactor: 1 })).toBe(235);

    expect(rem({ size: 10, fontScaleFactor: 2, shouldScale: true })).toBe(470);
    expect(rem({ size: 10, fontScaleFactor: 2 })).toBe(235);

    expect(rem({ size: 10, fontScaleFactor: 5, shouldScale: true })).toBe(1175);
    expect(rem({ size: 10, fontScaleFactor: 5 })).toBe(235);
  });
});
