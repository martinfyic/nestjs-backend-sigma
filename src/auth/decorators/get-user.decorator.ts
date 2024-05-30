/**
 * Custom decorator para obtener el usuario de la request
 * si enviamos la data devuelve la data del objeto user, de lo contrario devuelve el user
 */

import {
  ExecutionContext,
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;

    if (!user) throw new InternalServerErrorException('User not found');

    return !data ? user : user[data];
  },
);
