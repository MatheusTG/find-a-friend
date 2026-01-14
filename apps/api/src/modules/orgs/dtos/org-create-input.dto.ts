export interface OrgCreateInput {
  name: string;
  email: string;
  password: string;
  phone: string;
  cep: string;
  neighborhood: string;
  street: string;
  number: string;
  complement: string | null;
}
