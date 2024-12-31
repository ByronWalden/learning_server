import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

import { HanziPackageResponseDto, HanziService } from './';

@ApiTags('汉字包')
@Controller('hanzi')
export class HanziController {
  constructor(private readonly hanziService: HanziService) {}

  @Get('package')
  @ApiOperation({ summary: '获取学习汉字包' })
  @ApiQuery({ name: 'userId', required: true, type: Number })
  async getHanziPackage(@Query('userId') userId: number): Promise<HanziPackageResponseDto> {
    return this.hanziService.getHanziPackage(userId);
  }
}
