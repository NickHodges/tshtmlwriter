import IHtmlWriter from './htmlwriter.interfaces';
import Htmlwriter from './htmlwriter';
import * as chai from 'chai';
import { StringHelper, TagMaker } from './htmlwriter.utils';

const expect = chai.expect;

// Htmlwriter tests
describe('IHTMLWriter', () => {
  it('should have correct open tag when created', () => {
    const htmlWriter: IHtmlWriter = new Htmlwriter('blah');
    expect(htmlWriter.HTML).to.equal('<blah');
  });



});

// StringHelper tests

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

describe('TagMaker', () => {
  it('should create proper opening tag', () => {
    expect(TagMaker.MakeOpenTag('blah')).to.equal('<blah>');
  });

  it('should create proper closing tag', () => {
    expect(TagMaker.MakeCloseTag('blah')).to.equal('</blah>');
  });

  it('should create proper slash close tag', () => {
    expect(TagMaker.MakeSlashCloseTag()).to.equal(' />');
  });
});
