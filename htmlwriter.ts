import { CloseTag, TagState, HtmlErrorLevel, CanHaveAttributes, FormState, TableState } from './htmlwriter.types';
import IHtmlWriter from './htmlwriter.interfaces';
import { StringHelper, TagMaker } from './htmlwriter.utils';
import { cCloseBracket } from './htmlwriter.constants';

export default class HtmlWriter implements IHtmlWriter {
  private _html: string = '';
  private _currentTagName: string = '';
  private _closeTagType: CloseTag = CloseTag.Empty;

  private _tagStates = new Set(Array<TagState>());
  private _formStates = new Set(Array<FormState>());
  private _errorLevel = new Set(Array<HtmlErrorLevel>());
  private _tableStates = new Set(Array<TableState>());

  private _closingTag: string = '';
  private _parent: IHtmlWriter | null = null;

  constructor(aTagName: string, aCloseTagType: CloseTag = CloseTag.Normal) {
    if (StringHelper.StringIsEmpty(aTagName)) {
      throw new Error('aTagName parameter cannot be empty in the constructor');
    }
    this.initializeHtml(aCloseTagType, aTagName);
  }

  private initializeHtml(aCloseTag: CloseTag, aTagName: string) {
    this._currentTagName = aTagName;
    this._html = `<${aTagName}`;
    this._closeTagType = aCloseTag;
    this._tagStates.add(TagState.BracketOpen);
    this._errorLevel.add(HtmlErrorLevel.Errors);
    this.setClosingTagValue(aCloseTag, aTagName);
  }

  private setClosingTagValue(aCloseTag: CloseTag, aTagName: string = '') {
    switch (aCloseTag) {
      case CloseTag.Normal:
        this._closingTag = TagMaker.MakeCloseTag(aTagName);
        break;
      case CloseTag.Empty:
        this._closingTag = TagMaker.MakeSlashCloseTag();
        break;
      case CloseTag.Comment:
        this._closingTag = TagMaker.MakeCommentCloseTag();
        break;
    }
  }

  public addTag(aString: string, aCloseTagType: CloseTag = CloseTag.Normal, aCanHaveAttributes: CanHaveAttributes = CanHaveAttributes.CanHaveAttributes): IHtmlWriter {
    this.closeBracket();
    let temp: HtmlWriter = new HtmlWriter(aString, aCloseTagType);
    temp._parent = this._parent;
    temp._tagStates.add(TagState.BracketOpen);
    temp._formStates = this._formStates;
    temp._tableStates = this._tableStates;
    // take Self tag, add the new tag, and make it the HTML for the return
    this.HTML += temp.HTML;
    temp.HTML = '';
    temp.HTML += this.HTML;
    temp._parent = this;

    return temp;
  }

  private closeBracket(): IHtmlWriter {
    if (this._tagStates.has(TagState.BracketOpen) && !this.inCommentTag()) {
      this._html += cCloseBracket;
      this._tagStates.add(TagState.TagOpen);
      this._tagStates.delete(TagState.BracketOpen);
    }
    return this;
  }

  // inXXXTag() methods
  private inCommentTag(): boolean {
    return this._tagStates.has(TagState.CommentOpen);
  }

  // properties

  public get HTML(): string {
    return this._html;
  }

  public set HTML(aValue: string) {
    this._html = aValue;
  }
}
