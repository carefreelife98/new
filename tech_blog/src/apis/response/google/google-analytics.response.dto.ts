// Dimension Header Interface
interface DimensionHeader {
    name: string;
}

// Metric Header Interface
interface MetricHeader {
    name: string;
    type: string; // TYPE_INTEGER 등의 값이 들어갈 수 있음
}

// Dimension Value Interface
interface DimensionValue {
    value: string; // 날짜 또는 기타 문자열 값
}

// Metric Value Interface
interface MetricValue {
    value: string; // 숫자가 문자열로 표현됨
}

// Row Interface
interface Row {
    dimensionValues: DimensionValue[];
    metricValues: MetricValue[];
}

// Total Interface
interface Total {
    dimensionValues: DimensionValue[]; // 'RESERVED_TOTAL' 등
    metricValues: MetricValue[];       // 총합 데이터
}

// Metadata Interface
interface Metadata {
    currencyCode: string;
    timeZone: string;
}

// Main Google Analytics Response DTO Interface
export default interface GoogleAnalyticsResponseDto {
    dimensionHeaders: DimensionHeader[];
    metricHeaders: MetricHeader[];
    rows: Row[];             // 각 날짜별 데이터
    totals: Total[];         // 총합 데이터
    rowCount: number;        // 총 행 수
    metadata: Metadata;      // 메타데이터 (통화, 시간대 등)
    kind: string;            // 리소스 유형
}
