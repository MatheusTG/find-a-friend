export interface Org {
  id: string;
  number: string;
  name: string;
  email: string;
  passwordHash: string;
  phone: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  complement: string | null;
  createdAt: Date;
  updatedAt?: Date;
}
