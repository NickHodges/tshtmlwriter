import { CloseTagType, CanHaveAttributes, UseCRLFOptions } from './htmlwriter.types';
import { StringBuilder } from './htmlwriter.stringbuilder';

export default interface IHtmlWriter {
  get HTML(): StringBuilder;
  addTag(aString: string, aCloseTagType: CloseTagType, aCanHaveAttributes: CanHaveAttributes): IHtmlWriter;
  closeTag(aUseCRLF?: UseCRLFOptions): IHtmlWriter;

  openHead(): IHtmlWriter;
  openMeta(): IHtmlWriter;
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
