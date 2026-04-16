import { IsArray } from 'class-validator';

export class CreateChatDto {
  @IsArray()
  messages!: unknown[];
}
