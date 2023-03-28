import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';

export const IS_ADMIN_KEY = 'isAdmin';
export const Admin = () => {
  return SetMetadata(IS_ADMIN_KEY, true);
};
