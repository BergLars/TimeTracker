import { HedwigPage } from './app.po';

describe('hedwig App', function() {
  let page: HedwigPage;

  beforeEach(() => {
    page = new HedwigPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
