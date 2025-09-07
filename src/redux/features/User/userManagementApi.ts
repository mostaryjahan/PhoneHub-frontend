import { baseApi } from "@/redux/api/baseApi";

export const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query:()=>{
        return { url:'/users', method:'GET' }
      },
      providesTags:['users']
    }),

     // Get a specific user by email
     getSingleUser: builder.query({
      query: (email) => ({
        url: `/users/${email}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),

    changeUserRole: builder.mutation({
      query:(data)=>({
        url:'/auth/role-change',
        method:'PATCH',
        body:data
      })
    }),
    deleteUsers: builder.mutation({
      query:(userId)=>{
        return { 
          url:`/auth/delete-user/${userId}`, 
          method:'DELETE',
         }
      },
      invalidatesTags:['users']
    }),
    updatePassword: builder.mutation({
      query: ({ email, oldPassword, newPassword }) => ({
          url: "/auth/change-password",
          method: "PATCH",
          body: { email, oldPassword, newPassword },
      }),
  }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/auth/update-profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),
     // Update a specific user by ID
     updateUserProfile: builder.mutation({
      query: ({ id, userData }) => ({
        url: `/users/update-profile/${id}`,
        method: "PATCH",
        body: userData,
      }),
      invalidatesTags: ["users", "user"],
    }),

    // Update a specific user photo by ID
    updateUserProfilePhoto: builder.mutation({
      query: ({ id, userData }) => ({
        url: `/users/update-profile-photo/${id}`,
        method: "PATCH",
        body: userData,
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetSingleUserQuery,
  useDeleteUsersMutation,
  useChangeUserRoleMutation,
  useUpdateProfileMutation,
  useUpdateUserProfilePhotoMutation,
  useUpdatePasswordMutation
} = userManagementApi;