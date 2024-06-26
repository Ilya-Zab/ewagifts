import { useRouter } from "next/router";
import Head from "next/head";
import variables from '../styles/variables.module.scss';


const Page = () =>
{
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
          <p className="test" style={{ color: variables.primaryColor }}>
            {slug}
          </p>
          <div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Page;
