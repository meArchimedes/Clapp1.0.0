import { User } from "./user.model";

export class Cleaner extends User{
  hourlyRate: number;
  perfectionism: number;
  efficiency: number;
  age: number
  gender: string;
  proofOfIdFile: File;
  workPermitFile: File;
  photoImg: File;
}
