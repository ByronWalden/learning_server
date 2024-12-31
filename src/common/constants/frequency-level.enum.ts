/**
 * 汉字字频等级
 */
export enum FrequencyLevel {
  /** [0.2, 5) 最高频 */
  LEVEL_1 = 1,
  /** [0.1, 0.2) */
  LEVEL_2 = 2,
  /** [0.07, 0.1) */
  LEVEL_3 = 3,
  /** [0.04, 0.07) */
  LEVEL_4 = 4,
  /** [0.02, 0.04) */
  LEVEL_5 = 5,
  /** [0.01, 0.02) */
  LEVEL_6 = 6,
  /** [0.006, 0.01) */
  LEVEL_7 = 7,
  /** [0.004, 0.006) */
  LEVEL_8 = 8,
  /** [0.003, 0.004) */
  LEVEL_9 = 9,
  /** [0.002, 0.003) */
  LEVEL_10 = 10,
  /** [0.0013, 0.002) */
  LEVEL_11 = 11,
  /** [0.001, 0.0013) */
  LEVEL_12 = 12,
  /** [0.0007, 0.001) */
  LEVEL_13 = 13,
  /** [0.0005, 0.0007) */
  LEVEL_14 = 14,
  /** [0.0003, 0.0005) */
  LEVEL_15 = 15,
  /** [0.0002, 0.0003) */
  LEVEL_16 = 16,
  /** [0, 0.0002) 最低频 */
  LEVEL_17 = 17,
}

/**
 * 字频等级范围定义
 */
interface FrequencyRange {
  min: number;
  max: number;
  level: FrequencyLevel;
}

/**
 * 字频等级范围配置
 */
const FREQUENCY_RANGES: FrequencyRange[] = [
  { min: 0.2, max: 5, level: FrequencyLevel.LEVEL_1 },
  { min: 0.1, max: 0.2, level: FrequencyLevel.LEVEL_2 },
  { min: 0.07, max: 0.1, level: FrequencyLevel.LEVEL_3 },
  { min: 0.04, max: 0.07, level: FrequencyLevel.LEVEL_4 },
  { min: 0.02, max: 0.04, level: FrequencyLevel.LEVEL_5 },
  { min: 0.01, max: 0.02, level: FrequencyLevel.LEVEL_6 },
  { min: 0.006, max: 0.01, level: FrequencyLevel.LEVEL_7 },
  { min: 0.004, max: 0.006, level: FrequencyLevel.LEVEL_8 },
  { min: 0.003, max: 0.004, level: FrequencyLevel.LEVEL_9 },
  { min: 0.002, max: 0.003, level: FrequencyLevel.LEVEL_10 },
  { min: 0.0013, max: 0.002, level: FrequencyLevel.LEVEL_11 },
  { min: 0.001, max: 0.0013, level: FrequencyLevel.LEVEL_12 },
  { min: 0.0007, max: 0.001, level: FrequencyLevel.LEVEL_13 },
  { min: 0.0005, max: 0.0007, level: FrequencyLevel.LEVEL_14 },
  { min: 0.0003, max: 0.0005, level: FrequencyLevel.LEVEL_15 },
  { min: 0.0002, max: 0.0003, level: FrequencyLevel.LEVEL_16 },
  { min: 0, max: 0.0002, level: FrequencyLevel.LEVEL_17 },
];

/**
 * 根据等级获取字频范围
 * @param level 字频等级
 * @returns 字频范围，格式如: [0.2, 5]
 */
export function getFrequencyRange(level: FrequencyLevel): [number, number] {
  const range = FREQUENCY_RANGES.find((r) => r.level === level);
  if (!range) {
    return [0, 0];
  }
  return [range.min, range.max];
}

/**
 * 根据字频获取对应的等级
 * @param frequency 字频
 * @returns 字频等级
 */
export function getFrequencyLevel(frequency: number): FrequencyLevel {
  const range = FREQUENCY_RANGES.find(
    (r) => frequency >= r.min && frequency < r.max,
  );
  return range?.level ?? FrequencyLevel.LEVEL_17;
} 