import { CloseTag, TagState, HtmlErrorLevel, CanHaveAttributes, FormState, TableState, UseCRLFOptions } from './htmlwriter.types';
import IHtmlWriter from './htmlwriter.interfaces';
import { StringHelper, TagMaker } from './htmlwriter.utils';
import { cCloseBracket, cOpenBracket, strClosingClosedTag, strNoClosingTag, cObject, cMap, cFrameset, cFieldSet, cComment, cForm, cUnorderedList, cOrderedList, cTable, cHead, cBody, cTableRow, cSelect, cOptGroup, cDL } from './htmlwriter.constants';
import { NoClosingTagHTMLWriterError, TryingToCloseClosedTagError } from './htmlwriter.exceptions';
import { StringBuilder } from './htmlwriter.stringbuilder';
import { cEmptyString } from './htmlwriter.constants';

export default class HtmlWriter implements IHtmlWriter {
  private _html: StringBuilder = new StringBuilder('');
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
    this._html = new StringBuilder('');
    this._html.append(cOpenBracket).append(this._currentTagName);
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
    this._html.append(temp.HTML.ToString());
    temp._html.Clear();
    temp._html.append(this.HTML.ToString());
    temp._parent = this; //<IHtmlWriter>(this);

    return temp;
  }

  // close methods

  public closeTag(aUseCRLF: UseCRLFOptions = UseCRLFOptions.NoCRLF): IHtmlWriter {
    if (this._tagStates.has(TagState.TagClosed)) {
      throw new TryingToCloseClosedTagError(strClosingClosedTag);
    }

    if (!this.inSlashOnlyTag() && !this.inCommentTag()) {
      this.closeBracket();
    }

    this.closeTheTag();

    this.cleanUpTagState();

    let result: IHtmlWriter;

    if (this._parent !== null) {
      let tempText: string = this.HTML.ToString();
      result = this._parent;
      result.HTML.Clear().append(tempText);
    } else {
      result = this;
      this._tagStates.delete(TagState.TagClosed);
    }

    if (aUseCRLF === UseCRLFOptions.UseCRLF) {
      result.HTML.append('\r\n');
    }

    return result;
  }

  private cleanUpTagState(): void {
    this._tagStates.add(TagState.TagClosed).delete(TagState.TagOpen);
    this._tagStates.delete(TagState.BracketOpen);

    if (this.tableIsOpen()) {
      this._tableStates.clear();
    }

    if (this._currentTagName === cObject && this.inObjectTag()) {
      this._tagStates.delete(TagState.InObjectTag);
    }

    if (this._currentTagName === cMap && this.inMapTag()) {
      this._tagStates.delete(TagState.InMapTag);
    }

    if (this._currentTagName === cFrameset && this.inFrameSetTag()) {
      this._tagStates.delete(TagState.InFrameSetTag);
    }

    if (this._currentTagName === cFieldSet && this.inFieldSetTag()) {
      this._tagStates.delete(TagState.InFieldSetTag);
    }

    if (this._currentTagName === cComment && this.inCommentTag()) {
      this._tagStates.delete(TagState.CommentOpen);
    }

    if (this._currentTagName === cForm && this.inFormTag()) {
      this._tagStates.delete(TagState.InFormTag);
    }

    if (this._currentTagName === cUnorderedList && this.inListTag()) {
      this._tagStates.delete(TagState.InListTag);
    }

    if (this._currentTagName === cOrderedList && this.inListTag()) {
      this._tagStates.delete(TagState.InListTag);
    }

    if (this._currentTagName === cTable && this.inTableTag()) {
      this._tableStates.delete(TableState.InTable);
    }

    if (this._currentTagName === cHead && this.inHeadTag()) {
      this._tagStates.delete(TagState.InHeadTag);
    }

    if (this._currentTagName === cBody && this.inBodyTag()) {
      this._tagStates.delete(TagState.InBodyTag);
    }

    if (this._currentTagName === cTableRow && this.inTableRowTag()) {
      this._tableStates.delete(TableState.InTableRowTag);
    }

    if (this._currentTagName === cSelect && this.inSelectTag()) {
      this._tagStates.delete(TagState.InSelectTag);
    }

    if (this._currentTagName === cOptGroup && this.inOptGroup()) {
      this._tagStates.delete(TagState.InOptGroup);
    }

    if (this._currentTagName === cDL && this.inDefList()) {
      this.removeDefintionFLags();
    }

    this._currentTagName = cEmptyString;
  }

  private closeTheTag(): void {
    if (this.tagIsOpen() || this.inCommentTag()) {
      if (StringHelper.StringIsEmpty(this._closingTag)) {
        throw new NoClosingTagHTMLWriterError(strNoClosingTag);
      }
      this.HTML.append(this._closingTag);
    }
  }

  private closeBracket(): IHtmlWriter {
    if (this._tagStates.has(TagState.BracketOpen) && !this.inCommentTag()) {
      this.HTML.append(cCloseBracket);
      this._tagStates.add(TagState.TagOpen);
      this._tagStates.delete(TagState.BracketOpen);
    }
    return this;
  }

  // inXXXTag() methods
  private inCommentTag(): boolean {
    return this._tagStates.has(TagState.CommentOpen);
  }

  private inSlashOnlyTag(): boolean {
    return this._closingTag === TagMaker.MakeSlashCloseTag();
  }

  private tagIsOpen(): boolean {
    return this._tagStates.has(TagState.TagOpen);
  }

  private tableIsOpen(): boolean {
    return this._tableStates.has(TableState.InTable);
  }

  private inObjectTag(): boolean {
    return this._tagStates.has(TagState.InObjectTag);
  }

  private inFormTag(): boolean {
    return this._formStates.has(FormState.InFormTag);
  }

  private inMapTag(): boolean {
    return this._tagStates.has(TagState.InMapTag);
  }

  private inFrameSetTag(): boolean {
    return this._tagStates.has(TagState.InFrameSetTag);
  }

  private inFieldSetTag(): boolean {
    return this._tagStates.has(TagState.InFieldSetTag);
  }

  private inSelectTag(): boolean {
    return this._tagStates.has(TagState.InSelectTag);
  }

  private inListTag(): boolean {
    return this._tagStates.has(TagState.InListTag);
  }

  private inTableTag(): boolean {
    return this._tableStates.has(TableState.InTable);
  }

  private inHeadTag(): boolean {
    return this._tagStates.has(TagState.InHeadTag);
  }

  private inBodyTag(): boolean {
    return this._tagStates.has(TagState.InBodyTag);
  }

  private inTableRowTag(): boolean {
    return this._tableStates.has(TableState.InTableRowTag);
  }

  private inOptGroup(): boolean {
    return this._formStates.has(FormState.InOptGroup);
  }

  private inDefList(): boolean {
    return this._tagStates.has(TagState.InDefinitionList);
  }

  private removeDefintionFLags(): void {
    this._tagStates.delete(TagState.InDefinitionList);
    this._tagStates.delete(TagState.HasDefinitionTerm);
    this._tagStates.delete(TagState.DefTermIsCurrent);
    this._tagStates.delete(TagState.DefItemIsCurrent);
  }

  // properties

  public get HTML(): StringBuilder {
    return this._html;
  }
}
