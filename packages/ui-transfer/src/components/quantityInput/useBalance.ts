import { API } from "@orderly.network/types";
import { useEffect, useState } from "react";

export function useBalance(
  token: API.TokenInfo,
  fetchBalance?: (token: string, decimals: number) => Promise<any>
) {
  const [balance, setBalance] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (loading || typeof fetchBalance !== "function") return;
    setLoading(true);
    fetchBalance(token.address, token.decimals)
      .then((balance) => {
        setBalance(balance);
      })
      .catch((err) => {
        console.error("fetchBalance", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  return { balance, loading };
}
