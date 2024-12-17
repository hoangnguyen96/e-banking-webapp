export interface ICard {
  id: number;
  fullName?: string;
  cardNumber: string;
  holderName: string;
  ccv: string;
  expireAt: string;
}

export interface ICardPayloadData extends Omit<ICard, 'id' | 'fullName'> {}

export interface ICardPayload {
  account: number;
  data: ICardPayloadData;
}