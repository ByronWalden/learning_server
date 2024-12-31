import { ApiProperty } from '@nestjs/swagger';

import { ResponseDto } from '../../common/dot/response-dto';

/**
 * 新学汉字数据结构
 */
export class NewHanziData {
  @ApiProperty({ description: '汉字' })
  hanzi_name!: string;

  @ApiProperty({ description: '频率' })
  frequency!: number;
}

/**
 * 复习汉字数据结构
 */
export class ReviewHanziData extends NewHanziData {
  @ApiProperty({ description: '学习次数' })
  learn_count!: number;

  @ApiProperty({ description: '语义掌握程度' })
  sem_dom!: number;

  @ApiProperty({ description: '发音掌握程度' })
  pro_dom!: number;
}

/**
 * 汉字包数据结构
 */
export class HanziPackageData {
  @ApiProperty({ description: '新学汉字列表', type: [NewHanziData] })
  newHanziList: NewHanziData[] = [];

  @ApiProperty({ description: '复习汉字列表', type: [ReviewHanziData] })
  reviewHanziList: ReviewHanziData[] = [];

  @ApiProperty({ description: '已掌握汉字列表', type: [String] })
  masteredHanziList: string[] = [];
}

/**
 * 汉字包响应DTO
 */
export class HanziPackageResponseDto extends ResponseDto<HanziPackageData> {
  @ApiProperty({ description: '汉字包', type: HanziPackageData })
  override data: HanziPackageData = new HanziPackageData();
}
