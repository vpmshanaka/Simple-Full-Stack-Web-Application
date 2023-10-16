import { IsNotEmpty, MinLength, IsEmail } from 'class-validator';

export class CreateUserDto {
  
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()  
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()      // Add this to ensure password is not empty.
  @MinLength(6)      // Ensure password is at least 6 characters long.
  password: string;
}
