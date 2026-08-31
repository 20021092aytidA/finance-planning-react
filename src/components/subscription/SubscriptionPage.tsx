import React, { useEffect, useState } from "react";
import { getSubscriptions, Sub } from "../../api/subscription/subGetRequests";

export default function SubscriptionPage() {
  const [subList, setSubList] = useState<Sub[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const userID = sessionStorage.getItem("userID");
    if (userID) {
      getSubs(userID);
    }
  }, []);

  const getSubs = async (userID: string): Promise<void> => {
    setIsLoading(true);

    try {
      const res = await getSubscriptions(userID);
      if (res.status == 200) {
        setSubList(res.data);
        return;
      }

      setSubList(null);
      alert("failed fetching sub, " + res.resMsg);
    } catch (error) {
      alert("failed fetching sub, " + error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading ? <div>Sub fetching..</div> : null}
      <div></div>
    </div>
  );
}
