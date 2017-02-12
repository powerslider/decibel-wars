import { DecibelWarsPage } from './app.po';

describe('decibel-wars App', function() {
  let page: DecibelWarsPage;

  beforeEach(() => {
    page = new DecibelWarsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
