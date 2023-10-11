import { Transform, Type } from 'class-transformer';
import { IsArray, IsMongoId } from 'class-validator';

export class ManyIdsDto {
  @IsMongoId({ each: true })
  @Transform(({ value }) => {
    return value.split(',').map((i) => i.trim());
  })
  ids: string[];
}
