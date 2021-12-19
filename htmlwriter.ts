import { CloseTagType, CanHaveAttributes, TagStateType } from './htmlwriter.types';
import IHtmlWriter from './htmlwriterintf';
import { StringIsEmpty } from './htmlwriter.utils';

export default class HtmlWriter implements IHtmlWriter {
  private _html: string;
  private _currentTagName: string;
  private _tagState: TagStateType

  constructor(aTagName: string, aCloseTagType: CloseTagType = CloseTagType.Normal) {
    this._html = '';
    if (StringIsEmpty(aTagName)){
      throw new Error('aTagname parameter cannot be empty');
    }
    this.initializeHtml(aCloseTagType, aTagName);
  }

  initializeHtml(aCloseTagType: CloseTagType, aTagName: string) {
    this._currentTagName = aTagName;
    this._html = `<${aTagName}`;
    this._tagState = TagStateType.BracketOpen;
  }

  public get HTML(): string {
    return this._html;
  }
}
