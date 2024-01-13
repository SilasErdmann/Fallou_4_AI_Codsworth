import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Trait } from "../typeorm/Trait";

@Injectable()
export class TraitService {

  constructor(
    @InjectRepository(Trait)
    private traitRepository: Repository<Trait>
  ) {}

  async readTrait(name: string) {
    return this.traitRepository.find({
      where: { companion: { name } },
      relations: ['companion'],
    });
  }  

  async createTrait(name: string, type: string, companionId: number) {
    const newTrait = this.traitRepository.create({
      name,
      type,
      companionId,
    });
    return this.traitRepository.save(newTrait);
  }

  async updateTrait(id: number, name: string, type: string, companionId: number) {
    return this.traitRepository.update(id, { name, type, companionId });
  }

  async deleteTrait(id: number) {
    return this.traitRepository.delete(id);
  }

}
