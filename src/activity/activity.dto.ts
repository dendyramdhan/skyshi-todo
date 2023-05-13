import { ApiProperty } from '@nestjs/swagger';

export class CreateActivityDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  email: string;
}

export class UpdateActivityDto {
  @ApiProperty()
  title: string;
}