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
