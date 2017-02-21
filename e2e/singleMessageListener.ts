export class SingleMessageListener {

  private _messages: Array<any>;

  constructor() {
    this._messages = [];
  }

  processMessage(msg) {
    this._messages.push(msg);
  }

  receivesAMessage() {
    expect(this._messages.length).toBeGreaterThan(0)
  }

}
