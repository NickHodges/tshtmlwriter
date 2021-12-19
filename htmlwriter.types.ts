export enum CloseTagType {
  Normal,
  Empty,
  Comment,
}

export enum CanHaveAttributes {
  CanHaveAttributes,
  CannotHaveAttributes,
}

export enum TagStateType {
  BracketOpen,
  tsTagOpen,
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
