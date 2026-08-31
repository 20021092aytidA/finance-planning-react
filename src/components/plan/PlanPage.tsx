import React, { useEffect, useState } from "react";
import { Plan, getPlan } from "../../api/plan/planGetRequests";

export default function PlanPage() {
  const [planList, setPlanList] = useState<Plan[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const userID = sessionStorage.getItem("userID");
    if (userID) {
      fetchPlan(userID);
    }
  }, []);

  const fetchPlan = async (userID: string): Promise<void> => {
    setIsLoading(true);
    try {
      const res = await getPlan(userID);
      if (res.status == 200) {
        setPlanList(res.data);
        return;
      }

      setPlanList(null);
      alert("failed fetching plan, " + res.resMsg);
    } catch (error) {
      alert("failed fetching plan, " + error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading ? <div>fetching plans..</div> : null}
      <div></div>
    </div>
  );
}
