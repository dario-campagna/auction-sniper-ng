import {FakeAuctionServer} from "./fake-auction-server";
import {ApplicationRunner} from "./application-runner";
import {browser} from "protractor";

describe('auction-sniper end to end test', () => {

  let auction: FakeAuctionServer;
  let application: ApplicationRunner;

  beforeEach(() => {
    auction = new FakeAuctionServer('item-54321');
    application = new ApplicationRunner();
  });

  afterEach(() => {
    auction.stop();
  });

  it('Sniper joins auction until auction closes', () => {
    browser.wait(() => {
      return auction.startSellingItem().then(() => {return true;})
    }).then(() => {
      application.startBiddingIn(auction);
      browser.wait(() => {
        return auction.hasReceivedJoiningRequestFromSniper().then(() => {
          return true;
        });
      }).then(() => {
        auction.announceClosed();
        application.showsSniperHasLostAuction();
      });
    });

  });

});
