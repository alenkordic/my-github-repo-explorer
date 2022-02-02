import { useQuery } from "react-query";

import NavigationBarView from "./NavigationBar.view";
import { getUser } from "./../../services/api";

import { useAuthContext } from "./../../contexts/auth.context";

const NavigationBarContainer = () => {
  const { isAuthenticated } = useAuthContext();

  const { data: user, isSuccess } = useQuery("getUser", () => getUser(), {
    enabled: isAuthenticated,
  });

  if (isSuccess) {
    console.log("yere", user);
  }

  console.log("isAuthenticated", isAuthenticated);

  return (
    <div>
      <NavigationBarView isAuthenticated={isAuthenticated} user={user} />
    </div>
  );
};

export default NavigationBarContainer;
