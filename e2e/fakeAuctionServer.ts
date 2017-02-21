import {SingleMessageListener} from "./singleMessageListener";
var strophe = require("node-strophe").Strophe;
var Strophe = strophe.Strophe;

export class FakeAuctionServer {

  private static BROKER: string = "http://localhost:7070/http-bind";
  private static AUCTION_RESOURCE: string = "auction";
  private static ITEM_ID_AS_LOGIN: string = "auction-";
  private static AUCTION_PASSWORD: string = "auction";

  private _itemId: string;
  private _connection: any;
  private _singleMessageListener: SingleMessageListener;

  constructor(itemId: string) {
    this._itemId = itemId;
    this._connection = new Strophe.Connection(FakeAuctionServer.BROKER);
    this._singleMessageListener = new SingleMessageListener();
  }

  startSellingItem() {
    let jid = FakeAuctionServer.ITEM_ID_AS_LOGIN + this.itemId +
      '@localhost/' + FakeAuctionServer.AUCTION_RESOURCE;
    this._connection.connect(jid, FakeAuctionServer.AUCTION_PASSWORD);
    this._connection.addHandler(this._singleMessageListener.processMessage, null, 'auction', null, null, null);
  }

  hasReceivedJoiningRequestFromSniper() {
    this._singleMessageListener.receivesAMessage();
  }

  announceClosed() {
    let attributes = {
      to: 'localhost/' + FakeAuctionServer.AUCTION_RESOURCE,
      from: FakeAuctionServer.ITEM_ID_AS_LOGIN + this._itemId + '@localhost/' + FakeAuctionServer.AUCTION_RESOURCE
    };
    this._connection.send(strophe.$msg(attributes));
  }

  stop(){
    this._connection.disconnect();
  }

  get itemId(): string {
    return this._itemId;
  }

}
