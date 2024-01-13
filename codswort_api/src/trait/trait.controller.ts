import { Controller, Get, Post, Put, Delete, Param, Body } from "@nestjs/common";
import { TraitService } from "./trait.service";
import { Trait } from "../typeorm/Trait";

@Controller("traits")
export class TraitController {
  constructor(private readonly traitService: TraitService) {}

  @Get(":name")
  async readTrait(@Param("name") name: string): Promise<Trait[]> {
    return this.traitService.readTrait(name);
  }

  @Post()
  async createTrait(@Body() trait: Trait): Promise<Trait> {
    const { name, type, companionId } = trait;
    return this.traitService.createTrait(name, type, companionId);
  }

  @Put(":id")
  async updateTrait(@Param("id") id: number, @Body() trait: Trait): Promise<any> {
    const { name, type, companionId } = trait;
    return this.traitService.updateTrait(id, name, type, companionId);
  }

  @Delete(":id")
  async deleteTrait(@Param("id") id: number): Promise<any> {
    return this.traitService.deleteTrait(id);
  }

}

