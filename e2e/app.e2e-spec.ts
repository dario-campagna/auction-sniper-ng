import { AuctionSniperNgPage } from './app.po';

describe('auction-sniper-ng App', function() {
  let page: AuctionSniperNgPage;

  beforeEach(() => {
    page = new AuctionSniperNgPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
