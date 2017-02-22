import {SingleMessageListener} from "./single-message-listener";
import {protractor, browser} from "protractor";
let strophe = require("node-strophe").Strophe;
let Strophe = strophe.Strophe;

export class FakeAuctionServer {

  private static BROKER: string = "http://localhost:7070/http-bind";
  private static AUCTION_RESOURCE: string = "Auction";
  private static ITEM_ID_AS_LOGIN: string = "auction-";
  private static AUCTION_PASSWORD: string = "auction";

  private _itemId: string;
  private _connection: Strophe.Connection;
  private _singleMessageListener: SingleMessageListener;

  constructor(itemId: string) {
    this._itemId = itemId;
    this._connection = new Strophe.Connection(FakeAuctionServer.BROKER);
    this._singleMessageListener = new SingleMessageListener();
  }

  startSellingItem(): any {
    let jid = FakeAuctionServer.ITEM_ID_AS_LOGIN + this._itemId +
      '@localhost/' + FakeAuctionServer.AUCTION_RESOURCE;
    let deferred = protractor.promise.defer();
    this._connection.connect(jid, FakeAuctionServer.AUCTION_PASSWORD, (status) => {
      if (status === Strophe.Status.CONNECTED) {
        this._connection.addHandler(this._singleMessageListener.processMessage(), null, 'message', null, null, null);
        this._connection.send(strophe.$pres().tree());
        deferred.fulfill();
      }
    });
    return deferred.promise;
  }

  hasReceivedJoiningRequestFromSniper(): any {
    return this._singleMessageListener.receivesAMessage();
  }

  announceClosed() {
    let attributes = {
      to: 'sniper@localhost/' + FakeAuctionServer.AUCTION_RESOURCE,
      from: FakeAuctionServer.ITEM_ID_AS_LOGIN + this._itemId + '@localhost/' + FakeAuctionServer.AUCTION_RESOURCE,
      type: 'chat'
    };
    this._connection.send(strophe.$msg(attributes).c('body',[],'ping').tree());
  }

  stop() {
    this._connection.disconnect('');
  }

  get itemId(): string {
    return this._itemId;
  }

}
