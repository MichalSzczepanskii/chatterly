import {
  Body,
  Controller,
  InternalServerErrorException,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import {
  ConversationService,
  MessageService,
} from '@chatterly/api/conversation/data-access';

@Controller('conversation')
export class ApiConversationFeatureController {
  constructor(
    private conversationService: ConversationService,
    private messageService: MessageService
  ) {}
  @Post('/user/:userId')
  async sendMessageToUser(
    @Body() body: { message: string },
    @Param() params,
    @Req() req
  ) {
    const conservation = await this.conversationService.getOrCreateConservation(
      [req.user.userId, params.userId]
    );

    if (!conservation)
      throw new InternalServerErrorException(
        'Conversation not found and could not be created.'
      );

    return this.messageService.addMessageToConversation({
      conversationId: conservation.id,
      authorId: req.user.userId,
      content: body.message,
    });
  }
}
