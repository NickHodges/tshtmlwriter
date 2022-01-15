import IHtmlWriter from '../htmlwriter.interfaces';
import Htmlwriter from '../htmlwriter';
import * as chai from 'chai';
import { StringHelper, TagMaker } from '../htmlwriter.utils';
import { CloseTag, CanHaveAttributes, UseCRLFOptions } from '../htmlwriter.types';
import * as stringConstants from '../htmlwriter.constants';

const expect = chai.expect;

let htmlWriter: IHtmlWriter;

beforeEach(() => {
  htmlWriter = new Htmlwriter(stringConstants.cHTML);
});

// Htmlwriter tests
describe('IHTMLWriter', () => {
  it('should have correct open tag when created', () => {
    expect(htmlWriter.HTML.toString()).to.equal(`<${stringConstants.cHTML}`);
  });

  it('should add a tag properly using addTag()', () => {
    htmlWriter.addTag('floog', CloseTag.Normal, CanHaveAttributes.CannotHaveAttributes);
    expect(htmlWriter.HTML.toString()).to.equal(`<${stringConstants.cHTML}><floog`);
  });

  it('should close a tag properly', () => {
    htmlWriter.addTag('floog', CloseTag.Normal, CanHaveAttributes.CannotHaveAttributes).closeTag().closeTag();
    expect(htmlWriter.HTML.toString()).to.equal(`<${stringConstants.cHTML}><floog></floog></${stringConstants.cHTML}>`);
  });

  it('should open head tag properly', () => {
    htmlWriter.openHead();
    expect(htmlWriter.HTML.toString()).to.equal(`<${stringConstants.cHTML}><head`);
  });
});
