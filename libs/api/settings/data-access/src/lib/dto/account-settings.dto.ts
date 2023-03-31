import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class AccountSettingsDto {
  @IsOptional()
  @IsNotEmpty()
  @MinLength(5)
  name?: string;
}
