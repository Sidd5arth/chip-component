import { toast } from "react-hot-toast";
import { Profile } from "../types";
export async function getAllProfiles() {
    try {
        const response = await fetch("https://randomuser.me/api/?results=15", {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("error in getting profiles");
        }

        const data = await response.json();
        const result = data.results;
        console.log(result);
        const resultant = result
            .filter((item: Profile) => item.id.value)
            .map((item: Profile) => ({
                email: item.email,
                login: {
                    username: item.login.username,
                },
                id: {
                    value: item.id.value,
                },
                picture: {
                    large: item.picture.large,
                    medium: item.picture.medium,
                    thumbnail: item.picture.thumbnail,
                },
            }));
        console.log(resultant);
        return resultant;
    } catch (error) {
        toast.error("Error fetching profiles");
        throw error;
    }
}
