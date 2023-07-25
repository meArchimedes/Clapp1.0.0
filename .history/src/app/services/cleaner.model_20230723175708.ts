import { User } from "./user.model.ts";

export class Cleaner extends User{
  hourlyRate: number;
  perfectionism: number;
  efficiency: number;
  gender: string;
  proofOfId: File;
  workPermit: File;
}
