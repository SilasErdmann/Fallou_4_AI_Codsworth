import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Willkommen Bei der Alpha Version der Fallout 4 Companions API!';
  }
}
