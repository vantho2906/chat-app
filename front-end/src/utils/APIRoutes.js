export const host = 'http://localhost:5001';
export const registerRoute = `${host}/user/register`;

export const avatarRoute = `${host}/upload`;
export const loginRoute = `${host}/user/login`;

export const sendOTPRoute = `${host}/otp/send`;
export const resendOTPRoute = `${host}/otp/resend`;
export const confirmOTPRoute = `${host}/otp/confirm`;

export const searchUserByPhoneRoute = `${host}/search/phone`;
export const searchUserByFullnameRoute = `${host}/search/fullname`;

export const sendRequestRoute = `${host}/invite/send`;
export const getRequestRoute = `${host}/invite`;

export const allUsersRoute = `${host}/user/allusers`;
export const sendMessageRoute = `${host}/api/messages/addmsg`;
export const getAllMessageRoute = `${host}/api/messages/getmsg`;
