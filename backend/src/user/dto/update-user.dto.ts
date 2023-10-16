import { IsNotEmpty, IsOptional, MinLength, IsEmail } from 'class-validator';

export class UpdateUserDto {
  
  @IsOptional()
  @IsNotEmpty()
  firstName?: string;

  @IsOptional()
  @IsNotEmpty()  
  lastName?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsNotEmpty()
  @MinLength(6)
  password?: string;
}
