export type CloseTagInfo = { tagName: string; closeTag: CloseTagType };

export enum CloseTagType {
  Normal,
  Empty,
  Comment,
}

export enum CanHaveAttributes {
  CanHaveAttributes,
  CannotHaveAttributes,
}

export enum TagState {
  NoTag,
  BracketOpen,
  TagOpen,
  CommentOpen,
  TagClosed,
  InHeadTag,
  InBodyTag,
  InListTag,
  InObjectTag,
  InFieldSetTag,
  InFrameSetTag,
  InFormTag,
  InMapTag,
  InDefinitionList,
  HasDefinitionTerm,
  DefTermIsCurrent,
  DefItemIsCurrent,
  InSelectTag,
  InOptGroup,
}

export enum HtmlErrorLevel {
  Errors,
  StrictHTML4,
  StrictHTML5,
  Strictxhtml,
}

export enum FormState {
  InFormTag,
  InSelect,
  InOptGroup,
}

export enum TableState {
  InTable,
  InTableRowTag,
  TableHasCaption,
  TableHasColGroup,
  TableHasCol,
  TableHasData,
}

export enum UseCRLFOptions {
  UseCRLF,
  NoCRLF,
}
