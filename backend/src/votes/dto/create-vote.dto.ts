import { IsNotEmpty, IsIn, IsNumber } from 'class-validator';

export class CreateVoteDto {
  @IsNotEmpty()
  @IsIn([-1, 1])
  value: number;

  userID: number;

  @IsNotEmpty()
  @IsNumber()
  postID: number;
}
