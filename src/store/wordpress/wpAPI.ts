import { wpNavLink } from "@/types/layouts/Menus";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { z } from "zod";

const menuResponseSchema = z.record(z.any());
type menuResponseType = z.infer<typeof menuResponseSchema>;

export const wpAPI = createApi({
    reducerPath: 'wpAPI',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/wp' }),
    endpoints: (build) => ({
        fetchMenuItems: build.query({
            query: (params) => ({
                url: '/menu-items',
                params,
            }),
            transformResponse: (response: menuResponseType): wpNavLink[] => {
                const links = Object.values(response).map(obj => ({
                    title: obj.title.rendered,
                    url: obj.url,
                    isButton: obj.is_button,
                    isIcon: obj.fa_icon_code,
                    id: obj.id,
                }));
                return links;
            },
        }),
        fetchSomeMenuItems: build.query({
            query: (params) => ({
                url: '/menus',
                params,
            }),
        }),
        fetchAllBlogPosts: build.query({
            query: (params) => ({
                url: '/posts',
                params,
            }),
        }),
        fetchUserData: build.query({
            query: (accessToken) => ({
                url: '/users/me',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
            }),
        }),
    }),
})

export const {
    useFetchMenuItemsQuery,
    useFetchSomeMenuItemsQuery,
    useFetchAllBlogPostsQuery,
    useLazyFetchUserDataQuery,
    useFetchUserDataQuery
} = wpAPI;