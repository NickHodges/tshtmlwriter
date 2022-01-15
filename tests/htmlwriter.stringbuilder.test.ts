import * as chai from 'chai';
import { StringBuilder } from '../htmlwriter.stringbuilder';

const expect = chai.expect;

let sb: StringBuilder;

beforeEach(() => {
  sb = new StringBuilder('blah');
});

describe('StringBuilder', () => {
  it('should correctly append text from scratch', () => {
    expect(sb.toString()).to.equal('blah');
  });

  it('should correctly double append text from scratch', () => {
    expect(sb.append('garf').toString()).to.equal('blahgarf');
  });

  it('should report clear string is empty', () => {
    expect(sb.append('garf').clear().isEmpty()).to.equal(true);
  });
});
