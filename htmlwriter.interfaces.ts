import { CloseTag, CanHaveAttributes, UseCRLFOptions } from './htmlwriter.types';
import { StringBuilder } from './htmlwriter.stringbuilder';

export default interface IHtmlWriter {
  get HTML(): StringBuilder;
  addTag(aString: string, aCloseTagType: CloseTag, aCanHaveAttributes: CanHaveAttributes): IHtmlWriter;
  closeTag(aUseCRLF?: UseCRLFOptions): IHtmlWriter;
}

export interface ITableWriter {
  OpenTableRow(): ITableWriter & IHtmlWriter;
  OpenTableHeader(): ITableWriter & IHtmlWriter;
  OpenTableData(): ITableWriter & IHtmlWriter;
  AddTableData(aText: string): ITableWriter & IHtmlWriter;
  OpenCaption(): ITableWriter & IHtmlWriter;
  OpenColGroup(): ITableWriter & IHtmlWriter;
  OpenCol(): ITableWriter & IHtmlWriter;
  OpenTableHead(): ITableWriter & IHtmlWriter;
  OpenTableBody(): ITableWriter & IHtmlWriter;
  OpenTableFoot(): ITableWriter & IHtmlWriter;
}
