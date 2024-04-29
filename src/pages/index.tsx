import Head from "next/head";

const Home = () => {
  const pageTitle = "Home Page";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={`This is ${pageTitle}`} />
      </Head>
      <main>
        <h1>{pageTitle}</h1>
        <p>Welcome to the Home Page</p>
      </main>
    </>
  );
};

export default Home;
