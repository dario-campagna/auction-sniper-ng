import {Injectable} from "@angular/core";

@Injectable()
export class AuctionService {

  private static BROKER: string = "http://localhost:7070/http-bind";
  private static AUCTION_RESOURCE: string = "Auction";
  private static ITEM_ID_AS_LOGIN: string = "auction-";

  private _connection: Strophe.Connection;

  constructor() {
    this._connection = new Strophe.Connection(AuctionService.BROKER);
  }

  joinAuction(username: string, password: string, itemId: string):Promise<string> {
    return new Promise<string>(resolve => {
      this._connection.connect(username + '@localhost/' + AuctionService.AUCTION_RESOURCE, password, status => {
        if (status === Strophe.Status.CONNECTED) {
          let attributes = {
            to: AuctionService.ITEM_ID_AS_LOGIN + itemId + '@localhost/' + AuctionService.AUCTION_RESOURCE,
            from: username + '@localhost/' + AuctionService.AUCTION_RESOURCE,
            type: 'chat'
          };
          this._connection.addHandler(() => {resolve("Lost"); return  true;}, null, 'message', null, null, null);
          this._connection.send($pres().tree());
          this._connection.send($msg(attributes).c('body',[],'ping').tree());
        }
    })});
  }

  disconnect() {
    this._connection.disconnect('');
  }
}
