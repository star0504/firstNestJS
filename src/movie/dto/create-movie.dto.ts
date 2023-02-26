// npm으로 설치해야한다.
import { IsString, IsNumber, IsOptional } from 'class-validator';

// 데이터 전송에 필요한 항목을 나열

export default class createMovieDto {
  @IsString()
  readonly title: string;
  @IsNumber()
  readonly year: number;
  @IsOptional()
  @IsString({ each: true })
  readonly genres: string[];
}
