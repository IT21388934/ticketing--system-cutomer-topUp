/* Create react context to store customer data that retrieved 
from login and signup. This context is used to get logged in customer data.
*/

import { createContext } from "react";

//create context
export const CredentialsContext = createContext({
  storedCredentials: {},
  setStoredCredentials: () => {},
});
