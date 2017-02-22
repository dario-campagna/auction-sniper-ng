import {protractor} from "protractor";
export class SingleMessageListener {

  private _messages: Array<any>;
  private _deferred: any;

  constructor() {
    this._messages = [];
    this._deferred = protractor.promise.defer();
  }

  processMessage() {
    return (msg) => {
      this._messages.push(msg);
      this._deferred.fulfill();
      return false;
    }
  }

  receivesAMessage(): any {
    let receivedPromise = protractor.promise.defer();
    this._deferred.promise.then(() => {
      receivedPromise.fulfill();
      expect(this._messages.length).toBeGreaterThan(0);
    });
    return receivedPromise.promise;
  }

}
