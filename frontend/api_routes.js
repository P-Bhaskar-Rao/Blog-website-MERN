export const HOST=import.meta.env.VITE_SERVER_URL
export const BASE_URL=`${HOST}/api`
export const SIGNUP_URL=`${BASE_URL}/auth/signup`
export const SIGNIN_URL=`${BASE_URL}/auth/signin`
export const GOOGLE_AUTH_URL=`${BASE_URL}/auth/google`
export const ADD_PROFILE_IMAGE_URL=`${BASE_URL}/upload/add-profile-image`
export const PROFILE_UPDATE_URL=`${BASE_URL}/user/update`
export const DELETE_USER_URL=`${BASE_URL}/user/delete`
export const SIGNOUT_URL=`${BASE_URL}/user/signout`
export const ADD_POST_IMAGE_URL=`${BASE_URL}/upload/add-post-image`
export const CREATE_POST_URL=`${BASE_URL}/post/create`
export const GET_POSTS_URL=`${BASE_URL}/post/get`
export const DELETE_POST_URL=`${BASE_URL}/post/delete`
export const UPDATE_POST_URL=`${BASE_URL}/post/update`
export const GET_USERS_URL=`${BASE_URL}/user/get-users`
export const GET_USER=`${BASE_URL}/user`
export const CREATE_COMMENT_URL=`${BASE_URL}/comment/create`
export const GET_COMMENTS_URL=`${BASE_URL}/comment/get`
export const LIKE_COMMENT_URL=`${BASE_URL}/comment/like-comment`