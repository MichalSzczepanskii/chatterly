import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import {
  ConversationService,
  MessageService,
} from '@chatterly/api/conversation/data-access';
import { Conversation } from '@chatterly/shared/data-access';

@Controller('conversations')
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

  @Get('/user/:userId')
  async getPrivateConversation(
    @Param() params,
    @Req() req
  ): Promise<Conversation> {
    const conversation =
      await this.conversationService.getConversationByParticipantsWithRelations(
        [req.user.userId, params.userId]
      );
    if (conversation) {
      const user = conversation.users.filter(
        user => user.id !== req.user.userId
      );
      return { ...conversation, name: user[0].name };
    }
    const participants =
      await this.conversationService.getUndefinedConversationParticipants([
        params.userId,
      ]);
    return {
      messages: [],
      users: participants,
      name: participants[0].name,
    };
  }

  @Get()
  async getLoggedUserConversations(@Req() req) {
    const { userId } = req.user;
    return await this.conversationService.getUserConversation(userId);
  }
}
