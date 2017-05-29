import { MarsColonyAppPage } from './app.po';

describe('mars-colony-app App', () => {
  let page: MarsColonyAppPage;

  beforeEach(() => {
    page = new MarsColonyAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
