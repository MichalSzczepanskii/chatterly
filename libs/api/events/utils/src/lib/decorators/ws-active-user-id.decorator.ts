import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const WsActiveUserId = createParamDecorator(
  (_: undefined, context: ExecutionContext): string => {
    const client = context.switchToWs().getClient();
    return client.handshake.user.userId;
  }
);
