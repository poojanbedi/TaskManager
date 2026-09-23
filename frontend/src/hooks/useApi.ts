import { useCallback, useState } from "react";
import { ApiError } from "../api";

// Wraps any API function with loading/error state, e.g.
//   const { execute, loading, error } = useApi(tasksApi.create);
export function useApi<Args extends unknown[], Result>(
  apiFn: (...args: Args) => Promise<Result>
) {
  const [data, setData] = useState<Result | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const execute = useCallback(
    async (...args: Args): Promise<Result | undefined> => {
      setLoading(true);
      setError(null);
      try {
        const result = await apiFn(...args);
        setData(result);
        return result;
      } catch (err) {
        setError(err instanceof ApiError || err instanceof Error ? err.message : "Request failed");
        return undefined;
      } finally {
        setLoading(false);
      }
    },
    [apiFn]
  );

  return { execute, data, error, loading };
}