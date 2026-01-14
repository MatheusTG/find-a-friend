export interface Org {
  id: string;
  number: string;
  name: string;
  email: string;
  passwordHash: string;
  phone: string;
  cep: string;
  neighborhood: string;
  street: string;
  complement: string | null;
  createdAt: Date;
  updatedAt?: Date;
}
