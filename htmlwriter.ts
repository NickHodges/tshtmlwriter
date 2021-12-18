import IHtmlWriter from './htmlwriterintf';

export default class HtmlWriter implements IHtmlWriter {
  private html: string;

  constructor() {
    this.html = '';
  }

  

  public get HTML(): string {
    return this.html;
  }
}
