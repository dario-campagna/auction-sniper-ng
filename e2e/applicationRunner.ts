import {FakeAuctionServer} from "./fakeAuctionServer";
import {AuctionSniperPage} from "./auctionSniperPage";

export class ApplicationRunner {

  private SNIPER_ID: string = 'sniper';
  private SNIPER_PASSWORD: string = 'sniper';
  private auctionSniperPage: AuctionSniperPage;

  startBiddingIn(auction: FakeAuctionServer) {
    this.auctionSniperPage = new AuctionSniperPage(this.SNIPER_ID, this.SNIPER_PASSWORD, auction.itemId);
    this.auctionSniperPage.navigateTo();
    this.auctionSniperPage.showSniperStatus("Joining")
  }

  showsSniperHasLostAuction() {
    this.auctionSniperPage.showSniperStatus("Lost");
  }
}
