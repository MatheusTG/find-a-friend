export interface Org {
  number: string;
  name: string;
  id: string;
  email: string;
  password_hash: string;
  phone: string;
  cep: string;
  neighborhood: string;
  street: string;
  complement: string | null;
  created_at: Date;
  updated_at?: Date;
}
