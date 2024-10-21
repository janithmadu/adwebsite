export interface FromErrors {
  [Key: string]: string | undefined;
}

export enum AddDealRoutes {
  AddInformation = "step01",
  DescriptionFeaturesImages = "step02",
  PostAds = "step03",
}
