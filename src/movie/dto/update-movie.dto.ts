// npm으로 설치해야한다.
import { PartialType } from '@nestjs/mapped-types';
import createMovieDto from './create-movie.dto';
// 데이터 수정에 필요한 항목을 나열
// 모든 항목을 필수록 입력해야 한다는 것만 제외하고 createMovieDto와 동일하다.

// 아래 코드와 동일하다.
export default class updateMovieDto extends PartialType(createMovieDto) {}

// export default class updateMovieDto {
//   @IsString()
//   readonly title?: string;
//   @IsNumber()
//   readonly year?: number;
//   @IsString({ each: true })
//   readonly genres?: string[];
// }
