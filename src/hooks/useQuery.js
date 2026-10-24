import { useQuery } from "@tanstack/react-query"
import api from "../api/api"

export const useFetchMyShortUrls = (token, onError) => {
    return useQuery({
        queryKey: ["my-shortenurls"],
        queryFn: async () => {
            return await api.get("/api/urls/myurls", {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                },
            });
        },
        select: (data) => {
            const sortedData = data.data.sort(
                (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
            );
            return sortedData;
        },
        staleTime: 5000,
        throwOnError: (error) => {
            if (onError) onError(error);
            return false;
        }
    });
};

export const useFetchTotalClicks = (token, onError) => {
    return useQuery({
        queryKey: ["url-totalclick"],
        queryFn: async () => {
            return await api.get(
                "/api/urls/totalClicks?startDate=2026-01-01&endDate=2027-12-31",
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: "Bearer " + token,
                    },
                }
            );
        },
        select: (data) => {
                // data.data =>
                    //  {
                    //     "2024-01-01": 120,
                    //     "2024-01-02": 95,
                    //     "2024-01-03": 110,
                    //   };
                      
                const convertToArray = Object.keys(data.data).map((key) => ({
                clickDate: key,
                count: data.data[key],
            }));
                // Object.keys(data.data) => ["2024-01-01", "2024-01-02", "2024-01-03"]

                // FINAL:
                //   [
                //     { clickDate: "2024-01-01", count: 120 },
                //     { clickDate: "2024-01-02", count: 95 },
                //     { clickDate: "2024-01-03", count: 110 },
                //   ]
                return convertToArray;
        },
        staleTime: 5000,
        throwOnError: (error) => {
            if (onError) onError(error);
            return false;
        }
    });
};