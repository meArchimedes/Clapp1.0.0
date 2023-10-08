import { User } from "./user.model";

export class Cleaner extends User{
  hourlyRate: number;
  perfectionism: number;
  efficiency: number;
  dob: any;
  gender: string;
  proofOfIdFile: File;
  workPermitFile: File;
  photoImg: File;
}
