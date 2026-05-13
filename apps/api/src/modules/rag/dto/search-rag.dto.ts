import { IsIn, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class SearchRagDto {
  @IsString()
  query!: string;

  @IsOptional()
  @IsIn(['en', 'es'])
  locale?: 'en' | 'es' = 'en';

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(20)
  topK?: number = 5;
}
