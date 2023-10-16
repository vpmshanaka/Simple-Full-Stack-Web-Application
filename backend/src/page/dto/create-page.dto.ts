import { IsNotEmpty, IsOptional, IsString, Validate } from 'class-validator';

export class CreatePageDto {

  @IsNotEmpty()
    title: string;

    @IsOptional()
    slug: string;

    @IsNotEmpty()
    content: string;
  }
  