interface OrgCreateBase {
  id?: string;
  name: string;
  email: string;
  phone: string;
  cep: string;
  neighborhood: string;
  street: string;
  number: string;
  complement: string | null;
  // pets?:
}

export interface OrgCreateInput extends OrgCreateBase {
  password: string;
}

export interface OrgCreateData extends OrgCreateBase {
  password_hash: string;
}
