import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdatePageDto {
  
  @IsOptional()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  slug?: string;

  @IsOptional()
  @IsNotEmpty()
  content?: string;
}
