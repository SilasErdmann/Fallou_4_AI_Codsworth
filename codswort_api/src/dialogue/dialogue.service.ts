import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dialogue } from '../typeorm/Dialogue';

@Injectable()
export class DialogueService {
  constructor(
    @InjectRepository(Dialogue)
    private readonly dialogueRepository: Repository<Dialogue>,
  ) {}

  async readDialogue(name: string) {
    return this.dialogueRepository.find({
      where: { companion: { name } },
      relations: ['companion'],
    });
  }

  async createDialogue(importance: string, user_input: string, companion_answer: string, ingame_time: Date, companionId: number) {
    const newDialogue = this.dialogueRepository.create({
      importance,
      user_input,
      companion_answer,
      ingame_time,
      companionId,
    });
    return this.dialogueRepository.save(newDialogue);
  }

  async updateDialogue(id: number, updatedDialogue: Partial<Dialogue>) {
    return this.dialogueRepository.update(id, updatedDialogue);
  }

  async deleteDialogue(id: number) {
    return this.dialogueRepository.delete(id);
  }

  async deleteAllDialogues() {
    return this.dialogueRepository.clear();
  }
}

