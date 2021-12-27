import { CloseTag, CanHaveAttributes, UseCRLFOptions } from './htmlwriter.types';
import { StringBuilder } from './htmlwriter.stringbuilder';

export default interface IHtmlWriter {
  get HTML(): StringBuilder;
  addTag(aString: string, aCloseTagType: CloseTag, aCanHaveAttributes: CanHaveAttributes): IHtmlWriter;
  closeTag(aUseCRLF: UseCRLFOptions): IHtmlWriter;
}
