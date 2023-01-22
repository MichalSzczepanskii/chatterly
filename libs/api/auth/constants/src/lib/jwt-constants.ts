export const jwtConstants = {
  secret: process.env.NX_JWT_SECRET || 'secretKey',
  expiresIn: process.env.NX_JWT_EXPIRES || '60m',
};
