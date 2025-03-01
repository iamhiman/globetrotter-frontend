import { countriesData } from '@/utils/constants/constants';
import { shuffleArray } from '@/utils/helpers/helpers';
import { IGlobetrotterApiResponse } from '@/utils/typings/typings';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define API service
export const globetrotterApi = createApi({
  reducerPath: 'globetrotterApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://headout-globetrotter.pages.dev' }),
  endpoints: (builder) => ({
    getDestinations: builder.query<IGlobetrotterApiResponse[], void>({
      query: () => '/assets/data.json',
      transformResponse: (response: IGlobetrotterApiResponse[]) => {
        // Manipulating api response to add more data for city-country
        return response
          .map((destination) => ({
            ...destination,
            options: shuffleArray([
              `${destination.city} - ${destination.country}`,
              'Seoul - South Korea',
              'Washington DC - USA',
              'New Delhi - India',
            ]),
          }))
          .concat(countriesData);
      },
    }),
  }),
});

// Export hooks for usage in components
export const { useGetDestinationsQuery } = globetrotterApi;
