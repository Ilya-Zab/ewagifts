import wpRestApi from "@/services/wordpress/WPRestAPI";
import Head from "next/head";
import {BlogList} from "@/components/Blog/BlogList";
import styles from './styles.module.scss';
import Breadcrumbs from "@/components/Layouts/Breadcrumbs";
import PagesNavigation from "@/components/Layouts/PagesNavigation";
import React from "react";

const Blog = ({response}) => {
    const pageTitle = "Blog";
    console.log(response,'getServerSideProps');

    const renderPagination = () => (
        <PagesNavigation
            // page={+page}
            // count={pagesCount}
            siblingCount={1}
            shape="rounded"
            hidePrevButton
            hideNextButton
            // onChange={onChangePage}
        />
    );

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={`This is ${pageTitle}`}/>
            </Head>
            <main>
                <div className="container">
                    <div className={styles.breadcrumbs}>
                        <Breadcrumbs/>
                    </div>
                    <h1 className={`sub-title ${styles.title}`}>
                        {pageTitle}
                    </h1>
                    <div className={styles.article}>
                        <BlogList data={response}/>
                    </div>
                    <div className={styles.pagination}>
                        {renderPagination()}
                    </div>
                </div>
            </main>
        </>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export async function getServerSideProps() {
    let response;
    try {
        response = await wpRestApi.get('posts');
        response = response.data;
    } catch (error) {
        response = (error as Error).message;
    }

    return {
        props: {
            response,
        },
    };
}

export default Blog;