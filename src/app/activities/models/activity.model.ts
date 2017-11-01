export class Activity {
  _id: string;
  name: string;
  description: string;
  comment: string;
  bounty: number;
  type: object;
  periodicity: object;
  category: object;
  modelType = 'activity';
}
