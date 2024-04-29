import { useRouter } from "next/router";
import Head from "next/head";


const Article = () => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          <p>
            {slug}
          </p>
          <div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Article;
