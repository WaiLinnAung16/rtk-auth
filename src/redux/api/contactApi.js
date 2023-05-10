import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://contact-app.mmsdev.site/api/v1`,
  }),
  tagTypes: ["contact"],
  endpoints: (builder) => ({
    getContact: builder.query({
      query: (token) => ({
        url: "/contact",
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["contact"],
    }),
  }),
});

export const { useGetContactQuery } = contactApi;
