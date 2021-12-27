import IHtmlWriter from '../htmlwriter.interfaces';
import Htmlwriter from '../htmlwriter';
import * as chai from 'chai';
import { StringHelper, TagMaker } from '../htmlwriter.utils';
import { CloseTag, CanHaveAttributes, UseCRLFOptions } from '../htmlwriter.types';

const expect = chai.expect;

let htmlWriter: IHtmlWriter;

beforeEach(() => {
  htmlWriter = new Htmlwriter('blah');
});

// Htmlwriter tests
describe('IHTMLWriter', () => {
  it('should have correct open tag when created', () => {
    expect(htmlWriter.HTML.ToString()).to.equal('<blah');
  });

  it('should add a tag properly using addTag()', () => {
    htmlWriter.addTag('floog', CloseTag.Normal, CanHaveAttributes.CannotHaveAttributes);
    expect(htmlWriter.HTML.ToString()).to.equal('<blah><floog');
  });

  it('should close a tag properly', () => {
    htmlWriter.addTag('floog', CloseTag.Normal, CanHaveAttributes.CannotHaveAttributes).closeTag(UseCRLFOptions.NoCRLF);
    expect(htmlWriter.HTML.ToString()).to.equal('<blah><floog></floog>');
  });
});




