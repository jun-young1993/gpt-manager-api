interface GoogleTrendsTrendingSearcheArticles {
  title: string;
  url: string;
}

interface GoogleTrendsTrendingSearcheTitle {
  query: string;
}
interface GoogleTrendsTrendingSearche {
  articles: GoogleTrendsTrendingSearcheArticles[];
  title: GoogleTrendsTrendingSearcheTitle;
}

interface GoogleTrendsDailyDefaultSearchDaySInterface {
  date: string;
  formattedDate: string;
  trendingSearches: GoogleTrendsTrendingSearche[];
}

interface GoogleTrendsDailyDefaultInterface {
  trendingSearchesDays: GoogleTrendsDailyDefaultSearchDaySInterface[];
}

export default interface GoogleTrendsDailyInterface {
  default: GoogleTrendsDailyDefaultInterface;
}

export interface GoogleTrendFindOption {
  start_date?: string;
  end_date?: string;
  title?: string;
  article_content?: string;
  type?: GoogleTrendTypes;
  geo?: GoogleGeoCode;
}

export enum GoogleTrendTypes {
  DAILY = 'daily',
}
// 한국 (대한민국): KR (대한민국)
// 미국: US (미국)
// 캐나다: CA (캐나다)
// 일본: JP (일본)
// 중국: CN (중국)
// 영국: GB (영국)
// 독일: DE (독일)
// 프랑스: FR (프랑스)
// 이탈리아: IT (이탈리아)
// 호주: AU (호주)
export const GooGleTrendGeos = {
  KR: 'KR',
  US: 'US',
} as const;

export type GoogleGeoCode =
  (typeof GooGleTrendGeos)[keyof typeof GooGleTrendGeos];
