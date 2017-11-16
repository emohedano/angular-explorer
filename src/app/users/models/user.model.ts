import { BountyClaim } from './bounty-claim.model';

export class User {
  _id: string;
  username: string;
  name: string;
  stars: number;
  range: string;
  isAdmin = false;
  modelType = 'user';
  bountyClaims: BountyClaim[] = [];
}
