import { MessageHubUiPage } from './app.po';

describe('message-hub-ui App', () => {
  let page: MessageHubUiPage;

  beforeEach(() => {
    page = new MessageHubUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
