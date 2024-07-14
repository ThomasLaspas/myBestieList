import { useEffect, useState } from "react";
import Hero from "./hero";
import { getFrineds } from "@/apis/axios";

function Mainpage() {
    const [load, setload] = useState<boolean>(false)
    const [friends, setfriends] = useState<any>([])
    useEffect(() => {
        const fetchFriends = async () => {
            setload(true)
            try {
                const response = await getFrineds()
                setfriends(response)
            } catch (error) {
                console.error('Error creating friend:', error);
                throw error;
            } finally {
                setload(false)
            }
        }
        fetchFriends()
    }, [])
    console.log(friends)

    if (load) {
        return (
            <>
                <h1>loading...</h1></>
        )
    }
    return (
        <div className="flex flex-col gap-7">
            <section className="w-full text-center text-primary text-4xl">
                <h1>My Besties</h1>
            </section>

            <section className="grid sm:grid-cols-2 lg:grid-cols-3 grid-cols-1 place-items-center mt-[3%] sm:px-0 px-4 gap-5">
                {friends.map((mp: any) => {
                    return (
                        <Hero friends={mp} key={mp.id} />
                    )
                })}
            </section>
        </div>
    );
}

export default Mainpage;
