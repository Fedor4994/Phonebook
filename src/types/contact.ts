export type Contact = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  favorite: boolean;
  userId: string;
};

export type ContactForUpdate = {
  _id: string;
  name?: string;
  phone?: string;
  email?: string;
};
