import {Component, OnInit, NgZone, OnDestroy} from "@angular/core";
import {AuctionService} from "./auction.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuctionService]
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'Joining';

  constructor(private _auctionService: AuctionService, private _ngZone: NgZone) {
  }

  ngOnInit(): void {
    this._ngZone.runOutsideAngular(() => {
      this._auctionService.joinAuction('sniper', 'sniper', 'item-54321').then((status) => {
        this._ngZone.run(() => {
          this.title = status;
        })
      });
    });
  }

  ngOnDestroy(): void {
    this._auctionService.disconnect();
  }

}
