// HTML Characters and HTML Entities

export const cObject: string = 'object';
export const cHTML = 'html';
export const cHead = 'head';
export const cBody = 'body';
export const cBlockQuote = 'blockquote';
export const cClass = 'class';
export const cStyle = 'style';
export const cID = 'id';
export const cMeta = 'meta';
export const cName = 'name';
export const cContent = 'content';
export const cform = 'form';
export const cInput = 'input';
export const cButton = 'button';

export const cFieldSet = 'fieldset';
export const cLegend = 'legend';
export const cFrameset = 'frameset';
export const cFrame = 'frame';
export const cNoFrames = 'noframes';
export const cMap = 'map';
export const cArea = 'area';
export const cAlt = 'alt';
export const cBaseFont = 'basefont';
export const cLink = 'link';
export const cParam = 'param';
export const cAction = 'action';
export const cMethod = 'method';
export const cValue = 'value';

export const cCRLF = '\r\n';

export const cAnchor = 'a';
export const cHREF = 'href';
export const cImage = 'img';
export const cURL = 'url';
export const cSource = 'src';
export const cHardRule = 'hr';
export const cBreak = 'br';
export const cUnorderedList = 'ul';
export const cOrderedList = 'ol';
export const cListItem = 'li';
export const cClear = 'clear';
export const cType = 'type';
export const cTable = 'table';
export const cBorder = 'border';
export const cCellPadding = 'cellpadding';
export const cCellSpacing = 'cellspacing';
export const cWidth = 'width';
export const cHeight = 'height';
export const cTableRow = 'tr';
export const cTableData = 'td';
export const cTableHead = 'thead';
export const cTableBody = 'tbody';
export const cTableFoot = 'tfoot';
export const cTableHeader = 'th';
export const cTitle = 'title';
export const cScript = 'script';
export const cNoScript = 'noscript';
export const cIFrame = 'iframe';
export const cBase = 'base';
export const cTarget = 'target';
export const cOption = 'option';
export const cOptGroup = 'optgroup';
export const cCaption = 'caption';
export const cLabel = 'label';
export const cTextArea = 'textarea';
export const cSelect = 'select';
export const cFor = 'for';
export const cCols = 'cols';
export const cRows = 'rows';
export const cColGroup = 'colgroup';
export const cCol = 'col';

export const cDD = 'dd';
export const cDT = 'dt';
export const cDL = 'dl';

export const cOpenBracket = '<';
export const cCloseBracket = '>';
export const cCloseSlashBracket = '/>';
export const cComment = '!--';
export const cCloseComment = '-->';
export const cSpace = ' ';
export const cEmptyString = '';

// Error strings
export const strCaptionMustBeFirst = 'A <caption> tag must be the very first tag after a <table> tag.';
export const strATagsBracketMust = "A tag's bracket must be open to add an attribute.  The Current tag is %s and the attribute being added is %s";
export const strTagNameRequired = 'The aTagName parameter of the THTMLWriter constructor cannot be an empty string.';
export const strOpenBracketImpossible = 'It should be impossible that the bracket is open here. Seeing this error means a very bad logic problem.';
export const strAMetaTagCanOnly = 'This tag can only be added inside a <head> tag.';
export const strThisMethodCanOnly = 'This method can only be called inside a <meta> tag.';
export const strClosingClosedTag = 'An attempt is being made to close a tag that is already closed.';
export const strMustBeInList = 'A list must be open in order to call CloseList.';
export const strMustBeInTable = 'A <table> tag must be open in order to call this.';
export const strMustBeInTableRow = 'A <tr> tag must be open to call this.';
export const strMustBeInComment = 'A comment must be open in order to call CloseComment';
export const strNotInFieldTag = 'A fieldset must be open to add this tag.';
export const strNoClosingTag = 'The FClosingTag field is empty, and that should never be the case.';
export const strNotInFrameSet = 'A <frame> tag can only be added inside of a <frameset> tag.';
export const strNotInMapTag = 'An <area> tag can only be added inside of a <map> tag.';
export const strNotInFormTag = 'A <form> tag must be open in order to call this.';
export const strMustBeInObject = 'An <object> tag must be open in order to call this.';
export const strOtherTagsOpen = 'The document cannot be closed -- there are non-<html> tags still open.';
export const strCantOpenCaptionOutsideTable = 'A <caption> tag can only be added immediately after a <table> tag';
export const strParamNameRequired = 'The name of a <param> tag cannot be empty';
export const strDeprecatedTag = 'The %s tag is deprecated  in HTML %s.x.';
export const strMustBeInSelectTag = 'A <select> tag must be open in order to use this tag.';
export const strCantOpenColOutsideTable = 'The <col> tag must be opened inside of a <table> tag';
export const strBadTagAfterTableContent = 'This tag cannot be added after table content has been added (<tr>, <th>, <tbody>, <tfoot>, etc.)';
export const strMustBeInDefinitionList = 'This tag can only be included in a Definition List <dl> tag.';
export const strCannotNestDefLists = 'You cannot nest a definition list inside another definition list';
export const strCannotAddDefItemWithoutDefTerm = 'You cannot add a <dd> tag except right after a <dl> tag or another <dd> tag';
