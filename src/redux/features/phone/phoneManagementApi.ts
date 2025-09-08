
import { baseApi } from "../../api/baseApi";

const carManagementApi = baseApi.injectEndpoints({

    endpoints:(builder)=>({
        getAllPhones: builder.query({
            query: ({ search, brand, category, model, priceMin, priceMax, sortBy, sortOrder, page, limit }) => {
              const params = new URLSearchParams();
              
              if (search) params.append("search", search);
              if (brand) params.append("brand", brand);
              if (category) params.append("category", category);
              if (model) params.append("model", model);
              if (priceMin) params.append("priceMin", priceMin);
              if (priceMax) params.append("priceMax", priceMax);
              if (sortBy) params.append("sortBy", sortBy);
              if (sortOrder) params.append("sortOrder", sortOrder);
              if (page) params.append("page", page);
              if (limit) params.append("limit", limit);
      
              return { url: `/phones?${params.toString()}`, method: "GET" };
            },
            transformResponse: (response:any) => ({
              data: response.data,
              meta: response.meta,
            }),
            providesTags: ['Phone'],
          }),
            getSinglePhone: builder.query({
                query:(phoneId)=>{
                    return { 
                    url:`/phones/${phoneId}`,
                    method:'GET',
                }
                },
                transformResponse:(response:any)=>{
                    return {
                        data: response.data,
                    };
                }
            }),
            addPhone: builder.mutation({
                query:(phoneInfo)=>({
                    url:'/phones',
                    method:'POST',
                    body:phoneInfo
                })
            }),
            deletePhone: builder.mutation({
                query:(phoneId)=>({
                    url:`/phones/${phoneId}`,
                    method:'DELETE',
                }),
                invalidatesTags: ['Phone'],
            }),
            updatePhone: builder.mutation({
                query:({phoneId, phoneData})=>({
                    url:`/phones/${phoneId}`,
                    method:'PUT',
                    body: phoneData
                }),
                invalidatesTags: ['Phone'],
            })
        }),
});

export const { 
   useGetAllPhonesQuery,
   useGetSinglePhoneQuery,
   useAddPhoneMutation,
   useDeletePhoneMutation,
   useUpdatePhoneMutation
} = carManagementApi;