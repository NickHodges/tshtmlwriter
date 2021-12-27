// StringHelper tests

import { expect } from "chai";
import { StringHelper } from "../htmlwriter.utils";

describe('StringHelper.StringIsEmpty', () => {
  it('should be true when string has no characters', () => {
    expect(StringHelper.StringIsEmpty('')).to.be.true;
  });
  it('should be false when string is all spaces', () => {
    expect(StringHelper.StringIsEmpty(' ')).to.be.false;
  });
  it('should be false when string has content', () => {
    expect(StringHelper.StringIsEmpty('blah')).to.be.false;
  });
});

describe('StringHelper.StringIsNotEmpty', () => {
  it('should be true when string has no characters', () => {
    expect(StringHelper.StringIsNotEmpty('')).to.be.false;
  });
  it('should be false when string is all spaces', () => {
    expect(StringHelper.StringIsNotEmpty(' ')).to.be.true;
  });
  it('should be false when string has content', () => {
    expect(StringHelper.StringIsNotEmpty('blah')).to.be.true;
  });
});

describe('StringHelper.StringIsEmptyWithTrim', () => {
  it('should be true when string has spaces', () => {
    expect(StringHelper.StringIsEmptyWithTrim('     ')).to.be.true;
  });
});

describe('StringHelper.StringIsNotEmptyWithTrim', () => {
  it('should be true when string has spaces', () => {
    expect(StringHelper.StringIsNotEmptyWithTrim('  dd   ')).to.be.true;
  });
});
