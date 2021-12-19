import IHtmlWriter from './htmlwriterintf';
import Htmlwriter from './htmlwriter';
import * as chai from 'chai';
import { StringIsEmpty, StringIsEmptyWithTrim, StringIsNotEmpty, StringIsNotEmptyWithTrim } from './htmlwriter.utils';

const expect = chai.expect;


// Htmlwriter tests
describe('IHTMLWriter', () => {
  it('should have correct open tag', () => {
    const htmlWriter: IHtmlWriter = new Htmlwriter('blah');
    expect(htmlWriter.HTML).to.equal('<blah');
  });
});

describe('HtmlWriter StringIsEmpty', () => {
  it('should be true when string has no characters', () => {
    expect(StringIsEmpty('')).to.be.true;
  });
  it('should be false when string is all spaces', () => {
    expect(StringIsEmpty(' ')).to.be.false;
  });
  it('should be false when string has content', () => {
    expect(StringIsEmpty('blah')).to.be.false;
  });
});

// Utilities tests

describe('HtmlWriter StringIsNotEmpty', () => {
  it('should be true when string has no characters', () => {
    expect(StringIsNotEmpty('')).to.be.false;
  });
  it('should be false when string is all spaces', () => {
    expect(StringIsNotEmpty(' ')).to.be.true;
  });
  it('should be false when string has content', () => {
    expect(StringIsNotEmpty('blah')).to.be.true;
  });
});

describe('HtmlWriter StringIsEmptyWithTrim', () => {
  it('should be true when string has spaces', () => {
    expect(StringIsEmptyWithTrim('     ')).to.be.true;
  });
});

describe('HtmlWriter StringIsNotEmptyWithTrim', () => {
  it('should be true when string has spaces', () => {
    expect(StringIsNotEmptyWithTrim('  dd   ')).to.be.true;
  });
});
