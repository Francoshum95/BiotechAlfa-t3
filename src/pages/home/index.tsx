import { InferGetStaticPropsType } from "next";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "src/server/api/root";
import superjson from "superjson";
import { createContextInner } from "src/server/api/trpc";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import Head from "next/head";
import Container from "src/components/Container";
import Skeleton from "src/components/Skeleton";

const baseUrl = "https://api.rss2json.com/v1/api.json?rss_url=";
const mainUrl = "https://app.newsloth.com/biospace-com/VlRQVQ.rss";
const earningsUrl = "https://app.newsloth.com/biospace-com/VlRRUQ.rss";

const fetchUrlMap: { [key: string]: string } = {
  main: `${baseUrl}${mainUrl}`,
  earnings: `${baseUrl}${earningsUrl}`,
};

interface fetchDataType {
  status: boolean;
  items: {
    title: string;
    pubDate: string;
    link: string;
    guid: string;
    author: string;
    thumbnail: string;
    description: string;
    content: string;
  }[];
}

const fetchNews = async (news: string): Promise<fetchDataType> => {
  const fetchUrl = fetchUrlMap[news] || `${baseUrl}${mainUrl}`;

  try {
    const response = await fetch(fetchUrl, {
      method: "GET",
    });

    const news = await response.json();

    return {
      status: news.status,
      items: news.items,
    };
  } catch (error) {
    console.log(error);
  }

  return {
    status: false,
    items: [],
  };
};

const DateFormat = (date: string) => {
  const dateold = date.split(" ");
  const newsdate = dateold[0];

  if (newsdate) {
    const dateformate = newsdate.split("-");

    const month = dateformate[1];
    const day = dateformate[2];

    return `${day}/${month}`;
  }

  return "";
};

const Home = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const { data } = props;

  const mainNews = useQuery({
    queryKey: ["news-main"],
    queryFn: () => fetchNews("main"),
  });

  const earningsNews = useQuery({
    queryKey: ["news-earnings"],
    queryFn: () => fetchNews("earnings"),
  });

  return (
    <>
      <Head>
        <title>BiotechAlfa</title>
        <meta name="description" content="Generated by create-t3-app" />
      </Head>
      <Container>
        <div className="container-border h-[20rem] w-full overflow-auto px-2">
          <div className="w-full ">
            <h1 className="news-header ">Main News</h1>
            <Skeleton isLoading={mainNews.isLoading}>
              <div className="mb-2 px-2">
                {mainNews.data &&
                  mainNews.data.items.map((item) => (
                    <article className="news-item-container " key={item.link}>
                      <a
                        className="news-item "
                        href={item.link}
                        target="_blank"
                      >
                        {item.title}
                      </a>
                      <time className="news-date ">
                        {DateFormat(item.pubDate)}
                      </time>
                    </article>
                  ))}
              </div>
            </Skeleton>
          </div>
          <div className="w-full">
            <h1 className="news-header ">Earnings News</h1>
            <Skeleton isLoading={earningsNews.isLoading}>
              <div className="mb-2 px-2">
                {earningsNews.data &&
                  earningsNews.data.items.map((item) => (
                    <article className="news-item-container" key={item.link}>
                      <a
                        className="news-item "
                        href={item.link}
                        target="_blank"
                      >
                        {item.title}
                      </a>
                      <time className="news-date ">
                        {DateFormat(item.pubDate)}
                      </time>
                    </article>
                  ))}
              </div>
            </Skeleton>
          </div>
        </div>
        <div className="container-border mt-2 w-full">
          <table className="w-full">
            <thead className="table-thead-container">
              <tr className="text-left text-white">
                <th className="table-thead w-[7rem] border-r-[1px]">Ticker</th>
                <th className="table-thead border-r-[1px]">
                  Company
                </th>
              </tr>
            </thead>
            <tbody className="text-yellow-600">
              {data &&
                data.map((item) => (
                  <tr
                    key={item.ticker}
                    className="cursor-pointer hover:bg-yellow-600 hover:text-white"
                    onClick={() => router.push(`stock/${item.ticker}`)}
                  >
                    <td className="table-body w-[7rem]">{item.ticker}</td>
                    <td className="table-body">{item.name}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Container>
    </>
  );
};

export default Home;

export const getStaticProps = async () => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: await createContextInner(),
    transformer: superjson,
  });

  const data = await ssg.stock.company.fetch();

  return {
    props: {
      data,
    },
  };
};
