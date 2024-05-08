// -- AWS AMPLIFY CONFIGURATION PARAMETERS --
import { Amplify } from "aws-amplify";
// console.log("env", import.meta.env);
// console.log("userpoolid", import.meta.env.VITE_USER_POOL_ID);
const AmplifyConfig = {
  // Existing Auth
  Auth: {
    Cognito: {
      userPoolClientId: import.meta.env.VITE_APP_CLIENT_ID,
      //  Amazon Cognito User Pool ID
      userPoolId: `${import.meta.env.VITE_USER_POOL_ID}`,
      // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
      identityPoolId: `${import.meta.env.VITE_IDENTITY_POOL_ID}`,
      // OPTIONAL - Set to true to use your identity pool's unauthenticated role when user is not logged in
      allowGuestAccess: false,
      signUpVerificationMethod: "code", // 'code' | 'link'
      loginWith: {
        username: "true",
        email: "true", // Optional
        phone: "false", // Optional
      },
    },
  },
};
export { AmplifyConfig };
