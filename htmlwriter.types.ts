export enum CloseTag {
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
  InListTag,
  InObjectTag,
  InFieldSetTag,
  InFrameSetTag,
  InMapTag,
  InDefinitionList,
  HasDefinitionTerm,
  DefTermIsCurrent,
  DefItemIsCurrent,
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
