/**
 * Contract: now関数
 *
 * 現在の日時を取得する関数のコントラクト定義
 */

export interface NowContract {
  /**
   * 現在の日時を返す
   *
   * @returns {Date} 現在の日時を表すDateオブジェクト
   *
   * Requirements:
   * - 戻り値は有効なDateオブジェクトである
   * - 呼び出し時点の現在時刻を返す
   * - ミリ秒精度の時刻情報を含む
   * - システムのローカルタイムゾーンに基づく
   */
  now(): Date;
}

/**
 * テスト用の期待値定義
 */
export interface NowTestExpectations {
  /** 戻り値の型がDateオブジェクトであること */
  returnsDateObject: boolean;

  /** Invalid Dateではないこと */
  isValidDate: boolean;

  /** 呼び出し前後の時刻範囲内であること */
  withinReasonableTimeRange: boolean;

  /** 連続呼び出しで時刻が進行すること（または同じであること） */
  timeProgression: boolean;
}

/**
 * パフォーマンス要件
 */
export interface NowPerformanceContract {
  /** 実行時間は1ミリ秒未満 */
  maxExecutionTime: 1; // ms

  /** メモリ使用量は最小限 */
  minimalMemoryFootprint: true;

  /** 外部依存なし */
  noDependencies: true;
}