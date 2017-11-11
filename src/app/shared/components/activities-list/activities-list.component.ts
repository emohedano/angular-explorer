import { Component, Input, EventEmitter, Output } from '@angular/core';

import { Activity } from '../../../activities/models/activity.model';
import { BountyClaim } from '../../../users/models/bounty-claim.model';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrls: ['./activities-list.component.scss']
})
export class ActivitiesListComponent {

  @Input() activities: Array<Activity>;
  @Input() displayEditButton = false;

  @Output() onBountyClaimed = new EventEmitter<Activity>();

  bountyClaimsMap: Map<string, boolean> = new Map();
  private _bountyClaims: Array<BountyClaim> = null;

  /*
    Intercept bountyClaims value and use it to populate bountyClaimsMap thenever
    bountyClaims property changes
  */
  @Input()
  set bountyClaims(claims: Array<BountyClaim>){

    for (const b of claims || []) {
      this.bountyClaimsMap.set(b.activity._id, b.validated);
    }

    this._bountyClaims = claims || null;
  }

  get bountyClaims(){
    return this._bountyClaims;
  }

  claimBounty(e, activity: Activity) {
    e.stopPropagation();
    this.onBountyClaimed.emit(activity);
  }

  displayBountyButton(activity) {
    return this.bountyClaims && this.bountyClaimsMap.has(activity._id) === false;
  }

  displayClaimStatus(activity) {
    return this.bountyClaims && this.bountyClaimsMap.has(activity._id);
  }

  getClaimStatus(activity) {
    const verified = this.bountyClaimsMap.get(activity._id);
    return (verified) ? 'Recompensa cobrada' : 'Autorización pendiente';
  }
}
