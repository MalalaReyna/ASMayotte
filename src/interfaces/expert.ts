export interface IExpert {
  id: string;
  name: string;
  occupation: string;
  imageUrl: string;
  socialMediaList: ISocialMedia[];
}

export interface ISocialMedia {
  id: string;
  iconUrl: string;
  smLink: string;
  smName: string;
}
