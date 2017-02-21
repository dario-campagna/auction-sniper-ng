import {FakeAuctionServer} from './fake-auction-server';
import {ApplicationRunner} from './application-runner';

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
    auction.startSellingItem();
    application.startBiddingIn(auction);
    auction.hasReceivedJoiningRequestFromSniper();
    auction.announceClosed();
    application.showsSniperHasLostAuction();
  });

});
