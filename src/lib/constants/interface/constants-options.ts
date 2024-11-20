export enum ConstantsOptionsTypes {
  APP = "app",
  DB = "db",
}

export interface ConstantsOptions {
  type: ConstantsOptionsTypes;
}
