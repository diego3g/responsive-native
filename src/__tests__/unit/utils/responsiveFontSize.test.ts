import { responsiveFontSize } from '../../../utils/responsiveFontSize';
import { getDeviceHeight } from '../../../utils/getDeviceHeight';
import { mocked } from 'ts-jest/utils';

jest.mock('../../../utils/getDeviceHeight');
const mockedGetDeviceHeight = mocked(getDeviceHeight, true);

describe('Utils | responsiveFontSize', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  afterAll(() => {
    jest.resetModules();
  });

  it("should use '680' standardScreenHeight if not provided", () => {
    mockedGetDeviceHeight.mockImplementation(() => {
      return 1000;
    });

    expect(responsiveFontSize(10)).toEqual(responsiveFontSize(10, 680));
  });

  it('should return a proportional value based on the device dimensions.', () => {
    mockedGetDeviceHeight.mockImplementation(() => {
      return 1000;
    });

    expect(responsiveFontSize(10)).toEqual(15);
    expect(responsiveFontSize(10, 300)).toEqual(33);
    expect(responsiveFontSize(12)).toEqual(18);
    expect(responsiveFontSize(12, 600)).toEqual(20);
    expect(responsiveFontSize(16)).toEqual(24);
    expect(responsiveFontSize(16, 800)).toEqual(20);
    expect(responsiveFontSize(18)).toEqual(26);
    expect(responsiveFontSize(18, 400)).toEqual(45);
  });
});
