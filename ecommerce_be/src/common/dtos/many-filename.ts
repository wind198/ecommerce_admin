import { Transform, Type } from 'class-transformer';
import { IsArray, IsMongoId, IsString } from 'class-validator';

export class ManyFileNameDto {
  @IsString({ each: true })
  @Transform(({ value }) => {
    return value.split(',').map((i) => i.trim());
  })
  ids: string[];
}
