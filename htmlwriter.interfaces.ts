import { CloseTag, CanHaveAttributes } from "./htmlwriter.types";

export default interface IHtmlWriter {
  get HTML(): string;
  addTag(aString: string, aCloseTagType: CloseTag, aCanHaveAttributes: CanHaveAttributes): IHtmlWriter;
}
