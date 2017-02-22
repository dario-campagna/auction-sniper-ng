import {browser, element, by} from "protractor";

export class AuctionSniperPage {

  private sniperId: string;
  private sniperPassword: string;
  private auctionId: string;

  constructor(sniperId: string, sniperPassword: string, auctionId: string) {
    this.sniperId = sniperId;
    this.sniperPassword = sniperPassword;
    this.auctionId = auctionId;
  }

  navigateTo(): void {
    browser.get('/' + this.auctionId +
      '?sniper_id=' + this.sniperId +
      '&sniper_password=' + this.sniperPassword);
  }

  showSniperStatus(status: string): void {
    expect(element(by.css('app-root h1')).getText()).toEqual(status);
  }
}
