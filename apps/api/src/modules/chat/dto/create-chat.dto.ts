import { IsArray, IsNotEmpty } from 'class-validator';
import type { UIMessage } from 'ai';

export class CreateChatDto {
  @IsArray()
  @IsNotEmpty()
  messages!: UIMessage[];
}
