import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Raw, LessThanOrEqual, LessThan, MoreThanOrEqual } from 'typeorm';

import { getFrequencyRange } from '../common/constants/frequency-level.enum';
import { UserEntity, UserHanziEntity } from '../entity';
import { HanziPackageResponseDto, HanziPackageData } from './dto/hanzi-package-response.dto';

@Injectable()
export class HanziService {
  constructor(
    @InjectRepository(UserHanziEntity)
    private readonly userHanziRepository: Repository<UserHanziEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  /**
   * 获取用户本次要进行学习的汉字包
   * @param userId 用户ID
   * @returns 汉字包
   */
  async getHanziPackage(userId: number): Promise<HanziPackageResponseDto> {
    // 获取用户当前学习等级
    const user = await this.userRepository.findOne({ where: { uid: userId } });
    if (!user) {
      throw new Error('用户不存在');
    }

    // 获取当前等级对应的频率范围
    const [minFreq, maxFreq] = getFrequencyRange(user.frequency_level);

    // 获取新学字集合
    const newHanziList = await this.userHanziRepository.find({
      where: {
        user_id: userId,
        frequency: Raw(alias => `${alias} >= :min AND ${alias} < :max`, { min: minFreq, max: maxFreq })
      },
      select: ['hanzi_name', 'frequency']
    });

    // 获取复习字集合
    const reviewHanziList = await this.userHanziRepository.find({
      where: [
        { user_id: userId, learn_count: LessThanOrEqual(1) },
        { user_id: userId, sem_dom: LessThan(4) },
        { user_id: userId, pro_dom: LessThan(4) }
      ],
      select: ['hanzi_name', 'frequency', 'learn_count', 'sem_dom', 'pro_dom']
    });

    // 获取掌握字集合
    const masteredHanziList = await this.userHanziRepository.find({
      where: {
        user_id: userId,
        sem_dom: MoreThanOrEqual(4),
        pro_dom: MoreThanOrEqual(4)
      },
      select: ['hanzi_name']
    });

    // 组装返回数据
    const packageData = new HanziPackageData();
    packageData.newHanziList = newHanziList;
    packageData.reviewHanziList = reviewHanziList;
    packageData.masteredHanziList = masteredHanziList.map(h => h.hanzi_name);

    const response = new HanziPackageResponseDto();
    response.code = 200;
    response.message = '获取成功';
    response.data = packageData;
    return response;
  }
}
