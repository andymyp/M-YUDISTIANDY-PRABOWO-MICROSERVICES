export interface JwtPayload {
  _id: string;
  emailAddress: string;
  iat?: Date;
}
