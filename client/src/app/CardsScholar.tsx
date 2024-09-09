import { useEffect, useState } from "react";
import ArticleCard from "@/app/CardLayout";
interface ArticleData {
  title: string;
  link: string;
  citation_id: string;
  authors: string;
  publication: string;
  cited_by: {
    value: number;
    link: string;
  };
  year: string;
}
export default function ArticleList({ scholarData }: any) {
  const [articles, setArticles] = useState<ArticleData[]>([]);
  useEffect(() => {
    if (scholarData && scholarData.articles) {
      setArticles(scholarData.articles);
    }
  }, [scholarData]);

  return (
    <div className="article-list">
      {articles &&
        articles.map((article) => (
          <ArticleCard key={article.citation_id} {...article} />
        ))}
    </div>
  );
}
