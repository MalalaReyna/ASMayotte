export type ContactUsRequest = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  enterprise: string;
  location: string;
  message: string;
};

export type ContactUsResponse = {
  message: string;
};
