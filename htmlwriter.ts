import * as hwTypes from './htmlwriter.types';
import IHtmlWriter from './htmlwriter.interfaces';
import { StringHelper, TagMaker } from './htmlwriter.utils';
import * as stringConstants from './htmlwriter.constants';
import * as hwErrors from './htmlwriter.exceptions';
import { StringBuilder } from './htmlwriter.stringbuilder';
import { cEmptyString } from './htmlwriter.constants';
import { Stack } from './htmlwriter.structures';

export default class HtmlWriter implements IHtmlWriter {
  private _html: StringBuilder = new StringBuilder('');
  private _currentTagName: string = '';
  private _tagStack: Stack<hwTypes.CloseTagInfo> = new Stack<hwTypes.CloseTagInfo>();

  private _tagStates = new Set(Array<hwTypes.TagState>());
  private _formStates = new Set(Array<hwTypes.FormState>());
  private _errorLevel = new Set(Array<hwTypes.HtmlErrorLevel>());
  private _tableStates = new Set(Array<hwTypes.TableState>());

  constructor(aTagName: string, aCloseTagType: hwTypes.CloseTagType = hwTypes.CloseTagType.Normal) {
    if (StringHelper.StringIsEmpty(aTagName)) {
      throw new Error('aTagName parameter cannot be empty in the constructor');
    }
    this.initializeHtml(aCloseTagType, aTagName);
  }

  private initializeHtml(aCloseTag: hwTypes.CloseTagType, aTagName: string) {
    this._currentTagName = aTagName;
    this._html.append(stringConstants.cOpenBracket).append(this._currentTagName);
    this._tagStates.add(hwTypes.TagState.BracketOpen);
    this._errorLevel.add(hwTypes.HtmlErrorLevel.Errors);
    this.pushClosingTagValue(aCloseTag, aTagName);
  }

  private pushClosingTagValue(aCloseTag: hwTypes.CloseTagType, aTagName: string = '') {
    switch (aCloseTag) {
      case hwTypes.CloseTagType.Normal:
        this._tagStack.push({ tagName: TagMaker.MakeCloseTag(aTagName), closeTag: aCloseTag });
        break;
      case hwTypes.CloseTagType.Empty:
        this._tagStack.push({ tagName: TagMaker.MakeSlashCloseTag(), closeTag: aCloseTag });
        break;
      case hwTypes.CloseTagType.Comment:
        this._tagStack.push({ tagName: TagMaker.MakeCommentCloseTag(), closeTag: aCloseTag });
        break;
    }
  }

  public addTag(aString: string, aCloseTagType: hwTypes.CloseTagType = hwTypes.CloseTagType.Normal, aCanHaveAttributes: hwTypes.CanHaveAttributes = hwTypes.CanHaveAttributes.CanHaveAttributes): IHtmlWriter {
    this.closeBracket();
    this._tagStates.add(hwTypes.TagState.BracketOpen);
    this._html.append(`<${aString}`);
    this.pushClosingTagValue(aCloseTagType, aString);
    return this;
  }

  // close methods

  public closeTag(aUseCRLF: hwTypes.UseCRLFOptions = hwTypes.UseCRLFOptions.NoCRLF): IHtmlWriter {
    if (this._tagStack.isEmpty()) {
      throw new hwErrors.TryingToCloseClosedTagError(stringConstants.strClosingClosedTag);
    }

    if (!this.inSlashOnlyTag() && !this.inCommentTag()) {
      this.closeBracket();
    }

    this.closeTheTag();

    this.cleanUpTagState();

    if (aUseCRLF === hwTypes.UseCRLFOptions.UseCRLF) {
      this.HTML.append(stringConstants.cCRLF);
    }

    return this;
  }

  private cleanUpTagState(): void {
    this._tagStates.add(hwTypes.TagState.TagClosed).delete(hwTypes.TagState.TagOpen);
    this._tagStates.delete(hwTypes.TagState.BracketOpen);

    if (this.tableIsOpen()) {
      this._tableStates.clear();
    }

    if (this._currentTagName === stringConstants.cObject && this.inObjectTag()) {
      this._tagStates.delete(hwTypes.TagState.InObjectTag);
    }

    if (this._currentTagName === stringConstants.cMap && this.inMapTag()) {
      this._tagStates.delete(hwTypes.TagState.InMapTag);
    }

    if (this._currentTagName === stringConstants.cFrameset && this.inFrameSetTag()) {
      this._tagStates.delete(hwTypes.TagState.InFrameSetTag);
    }

    if (this._currentTagName === stringConstants.cFieldSet && this.inFieldSetTag()) {
      this._tagStates.delete(hwTypes.TagState.InFieldSetTag);
    }

    if (this._currentTagName === stringConstants.cComment && this.inCommentTag()) {
      this._tagStates.delete(hwTypes.TagState.CommentOpen);
    }

    if (this._currentTagName === stringConstants.cForm && this.inFormTag()) {
      this._tagStates.delete(hwTypes.TagState.InFormTag);
    }

    if (this._currentTagName === stringConstants.cUnorderedList && this.inListTag()) {
      this._tagStates.delete(hwTypes.TagState.InListTag);
    }

    if (this._currentTagName === stringConstants.cOrderedList && this.inListTag()) {
      this._tagStates.delete(hwTypes.TagState.InListTag);
    }

    if (this._currentTagName === stringConstants.cTable && this.inTableTag()) {
      this._tableStates.delete(hwTypes.TableState.InTable);
    }

    if (this._currentTagName === stringConstants.cHead && this.inHeadTag()) {
      this._tagStates.delete(hwTypes.TagState.InHeadTag);
    }

    if (this._currentTagName === stringConstants.cBody && this.inBodyTag()) {
      this._tagStates.delete(hwTypes.TagState.InBodyTag);
    }

    if (this._currentTagName === stringConstants.cTableRow && this.inTableRowTag()) {
      this._tableStates.delete(hwTypes.TableState.InTableRowTag);
    }

    if (this._currentTagName === stringConstants.cSelect && this.inSelectTag()) {
      this._tagStates.delete(hwTypes.TagState.InSelectTag);
    }

    if (this._currentTagName === stringConstants.cOptGroup && this.inOptGroup()) {
      this._tagStates.delete(hwTypes.TagState.InOptGroup);
    }

    if (this._currentTagName === stringConstants.cDL && this.inDefList()) {
      this.removeDefintionFLags();
    }

    this._currentTagName = cEmptyString;
  }

  private closeTheTag(): void {
    if (!this._tagStack.isEmpty() || this.inCommentTag()) {
      this.HTML.append(this._tagStack.pop()?.tagName);
    } else {
      if (this._tagStack.isEmpty()) {
        throw new hwErrors.NoClosingTagHTMLWriterError(stringConstants.strNoClosingTag);
      }
    }
  }

  private closeBracket(): IHtmlWriter {
    if (this._tagStates.has(hwTypes.TagState.BracketOpen) && !this.inCommentTag()) {
      this.HTML.append(stringConstants.cCloseBracket);
      this._tagStates.add(hwTypes.TagState.TagOpen);
      this._tagStates.delete(hwTypes.TagState.BracketOpen);
    }
    return this;
  }

  // inXXXTag() methods
  private inCommentTag(): boolean {
    return this._tagStates.has(hwTypes.TagState.CommentOpen);
  }

  private inSlashOnlyTag(): boolean {
    return this._tagStack.peek()?.closeTag === hwTypes.CloseTagType.Empty;
  }

  private tagIsOpen(): boolean {
    return this._tagStates.has(hwTypes.TagState.TagOpen);
  }

  private tableIsOpen(): boolean {
    return this._tableStates.has(hwTypes.TableState.InTable);
  }

  private inObjectTag(): boolean {
    return this._tagStates.has(hwTypes.TagState.InObjectTag);
  }

  private inFormTag(): boolean {
    return this._formStates.has(hwTypes.FormState.InFormTag);
  }

  private inMapTag(): boolean {
    return this._tagStates.has(hwTypes.TagState.InMapTag);
  }

  private inFrameSetTag(): boolean {
    return this._tagStates.has(hwTypes.TagState.InFrameSetTag);
  }

  private inFieldSetTag(): boolean {
    return this._tagStates.has(hwTypes.TagState.InFieldSetTag);
  }

  private inSelectTag(): boolean {
    return this._tagStates.has(hwTypes.TagState.InSelectTag);
  }

  private inListTag(): boolean {
    return this._tagStates.has(hwTypes.TagState.InListTag);
  }

  private inTableTag(): boolean {
    return this._tableStates.has(hwTypes.TableState.InTable);
  }

  private inHeadTag(): boolean {
    return this._tagStates.has(hwTypes.TagState.InHeadTag);
  }

  private inBodyTag(): boolean {
    return this._tagStates.has(hwTypes.TagState.InBodyTag);
  }

  private inTableRowTag(): boolean {
    return this._tableStates.has(hwTypes.TableState.InTableRowTag);
  }

  private inOptGroup(): boolean {
    return this._formStates.has(hwTypes.FormState.InOptGroup);
  }

  private inDefList(): boolean {
    return this._tagStates.has(hwTypes.TagState.InDefinitionList);
  }

  private removeDefintionFLags(): void {
    this._tagStates.delete(hwTypes.TagState.InDefinitionList);
    this._tagStates.delete(hwTypes.TagState.HasDefinitionTerm);
    this._tagStates.delete(hwTypes.TagState.DefTermIsCurrent);
    this._tagStates.delete(hwTypes.TagState.DefItemIsCurrent);
  }

  // Main section methods

  public openHead(): IHtmlWriter {
    this._tagStates.add(hwTypes.TagState.InHeadTag);
    this.addTag(stringConstants.cHead, hwTypes.CloseTagType.Normal, hwTypes.CanHaveAttributes.CanHaveAttributes);
    return this;
  }

  public openMeta(): IHtmlWriter {
    this.checkInHeadTag();
    this.addTag(stringConstants.cMeta, hwTypes.CloseTagType.Empty);
    return this;
  }

  // Check methods
  private checkInHeadTag(): void {
    if (!this.inHeadTag() && this.checkForErrors()) {
      throw new hwErrors.NotInHeadTagError('Trying to add something to a <head> tag that is not allowed in a <head> tag');
    }
  }

  private checkForErrors(): boolean {
    return this._errorLevel.has(hwTypes.HtmlErrorLevel.Errors);
  }

  private CheckInCommentTag() {
    if (!this.inCommentTag() && this.checkForErrors) {

    }
  }

  private checkInListTag() {}
  private checkInFormTag() {}
  private checkInObjectTag() {}
  private checkInFieldSetTag() {}
  private checkInTableRowTag() {}
  private checkInTableTag() {}
  private checkInFramesetTag() {}
  private checkInMapTag() {}
  private checkInSelectTag() {}
  private checkBracketOpen(aString: string) {}
  private checkCurrentTagIsHTMLTag() {}
  private checkNoOtherTableTags() {}
  private checkNoColTag() {}
  private checkBeforeTableContent() {}
  private checkInDefList() {}
  private checkIfNestedDefList() {}
  private checkDefTermIsCurrent() {}
  private checkDefItemIsCurrent() {}

  // properties

  public get HTML(): StringBuilder {
    return this._html;
  }
}
