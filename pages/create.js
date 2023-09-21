import { useEffect, useState } from "react";
import cookies from "js-cookie";
import Create from "@/components/Create";

const CreateItemPage = () => {
  const [auth, setAuth] = useState("");
  useEffect(() => {
    const cookieAuth = cookies.get("token");
    setAuth(cookieAuth);
  }, []);

  return (
    <div>
      <Create auth={auth} />
    </div>
  );
};

export default CreateItemPage;
