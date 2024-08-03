export interface IEmployee {
  id: string;
  name: string;
  companyName: string;
  email: string;
  phone: string;
  role: string;
  avtr: any;
}
export interface IEmpData {
  type: string;
  empDetails: IEmployee;
}