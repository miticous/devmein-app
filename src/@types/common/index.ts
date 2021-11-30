export type JwtToken = {
  nickname: string;
  name: string;
  picture: string;
  email: string;
  emailVerified: boolean;
  sub: string;
  aud: string;
};
