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
}

export enum GoogleTrendTypes {
  DAILY = 'daily',
}
