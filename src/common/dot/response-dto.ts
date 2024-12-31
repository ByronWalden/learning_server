import { ApiProperty } from '@nestjs/swagger';

/**
 * 接口响应的DTO父类
 */
export class ResponseDto<T> {
  @ApiProperty({ description: '状态码' })
  code!: number;

  @ApiProperty({ description: '消息' })
  message!: string;

  @ApiProperty({ description: '数据' })
  data!: T;
}
