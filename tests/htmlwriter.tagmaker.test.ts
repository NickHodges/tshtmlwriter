import { expect } from "chai";
import { TagMaker } from "../htmlwriter.utils";

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
