import { useEffect, useState } from "react";
import ErrorPage from "../../../components/ErrorPage";
import { Link, useLocation, useParams } from "react-router";

type Article = {
  id: number;
  date: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
};

export default function LearningDetail() {
  const [article, setArticle] = useState<Article | null>(null);
  const { id } = useParams<{ id: string }>();
  const { hash } = useLocation();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/wp-json/wp/v2/posts/${id}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          },
        );

        if (!response.ok) {
          throw new Error(`${response.status}`);
        }

        const data = await response.json();
        setArticle(data);
      } catch (error) {
        return <ErrorPage status={404} />;
      }
    };

    fetchArticle();

    document.querySelectorAll('a[href^="https"]').forEach((link) => {
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    });
  }, [hash]);

  if (!article) return <ErrorPage status={404} />;

  return (
    <div className="max-w-4xl lg:mx-auto mx-4 mt-36">
      <h1 className="lg:text-5xl text-xl mt-12 font-bold">
        {article.title.rendered}
      </h1>
      <hr className="mt-3" />
      <div
        dangerouslySetInnerHTML={{ __html: article.content.rendered }}
        className="mt-16 wp-article"
      />

      <div className="mt-8 text-xl">
        <Link to="/learning" className="underline">
          「麻雀ハジメタイ」トップに戻る
        </Link>
      </div>
    </div>
  );
}
