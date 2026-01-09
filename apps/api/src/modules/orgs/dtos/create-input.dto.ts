interface CreateOrgBase {
  id?: string;
  name: string;
  email: string;
  phone: string;
  cep: string;
  neighborhood: string;
  street: string;
  number: string;
  complement?: string | null;
  created_at?: string | Date;
  updated_at?: string | Date;
  // pets?:
}

export interface CreateOrgInput extends CreateOrgBase {
  password: string;
}

export interface CreateOrgData extends CreateOrgBase {
  password_hash: string;
}
