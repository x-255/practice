import { IsInt, IsString } from "class-validator"

export class CatDTO {
  @IsString()
  name: string;

  @IsInt()
  age: number;

  @IsString()
  breed: string;
}