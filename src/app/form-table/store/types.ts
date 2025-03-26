import dayjs from "dayjs";

export interface FormData {
  id: number;
  title: string;
  firstname: string;
  lastname: string;
  birthday?: string | Date | null | dayjs.Dayjs;
  nationality: string;
  citizenID?: string;
  gender: string;
  countryCode: string;
  phoneNumber: string;
  passportNo?: string;
  expectedSalary?: number;
}
