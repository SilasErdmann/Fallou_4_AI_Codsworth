import { Controller, Sse, Param, Body } from '@nestjs/common';
import { CompanionService } from './companion.service';
import { Observable } from 'rxjs';
import { MessageEvent } from '@nestjs/common/interfaces';

@Controller(':cName')
export class CompanionController {
  constructor(private companionService: CompanionService) {}

  @Sse('chat')
  async sse(
    @Param() params: { cName: string },
    @Body() body: { message: string }
  ): Promise<Observable<MessageEvent>> {
    const { cName } = params;
    const { message } = body;
    return this.companionService.chat(cName, message);
  }
}
