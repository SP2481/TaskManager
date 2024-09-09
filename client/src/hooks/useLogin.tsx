import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useLogin = () => {
  const [accesstoken, setAccestoken] = useState("");
  const router = useRouter();
  useEffect(() => {
    const accesstoken = Cookies.get("accesstoken");
    if (!accesstoken) {
      router.push("/login");
    } else {
      setAccestoken(accesstoken);
    }
  }, [accesstoken]);
};
