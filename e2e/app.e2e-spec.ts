import { AngularAntdPage } from './app.po';

describe('angular-antd App', () => {
  let page: AngularAntdPage;

  beforeEach(() => {
    page = new AngularAntdPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
