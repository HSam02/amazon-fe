import { requestStatus } from "../types/enums";
import { IAddress } from "../types/interfaces";

export interface IActionAddress extends IAddress {
  editingId?: number;
}

export interface AddressDataType {
  key: number;
  address: string;
  status: requestStatus;
}