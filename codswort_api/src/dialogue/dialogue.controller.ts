import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { DialogueService } from './dialogue.service';
import { Dialogue } from '../typeorm/Dialogue';

@Controller('dialogue')
export class DialogueController {
  constructor(private readonly dialogueService: DialogueService) {}

  @Get(':name')
  async getDialoguesByCompanionId(@Param('name') name: string): Promise<Dialogue[]> {
    return this.dialogueService.readDialogue(name);
  }

  @Post()
  async createDialogue(@Body() dialogue: Dialogue): Promise<Dialogue> {
    return this.dialogueService.createDialogue(
      dialogue.importance,
      dialogue.user_input,
      dialogue.companion_answer,
      dialogue.ingame_time,
      dialogue.companionId,
    );
  }

  @Put(':id')
  async updateDialogue(@Param('id') id: number, @Body() updatedDialogue: Partial<Dialogue>): Promise<any> {
    return this.dialogueService.updateDialogue(id, updatedDialogue);
  }

  @Delete(':id')
  async deleteDialogue(@Param('id') id: number): Promise<any> {
    return this.dialogueService.deleteDialogue(id);
  }

  @Delete()
  async deleteAllDialogues(): Promise<any> {
    return this.dialogueService.deleteAllDialogues();
  }
}

