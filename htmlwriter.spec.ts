import IHtmlWriter from './htmlwriterintf';
import Htmlwriter from './htmlwriter';
import * as chai from 'chai';

const expect = chai.expect;

describe('IHTMLWriter', () => {
  it('new instance should have empty HTML', () => {
    const htmlWriter: IHtmlWriter = new Htmlwriter();
    expect(htmlWriter.HTML).to.equal('');
  });
});
