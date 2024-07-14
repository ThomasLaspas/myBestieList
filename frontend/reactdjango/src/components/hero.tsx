import { MdDelete } from "react-icons/md";
import { SlNote } from "react-icons/sl";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { deletefriend, UpdateFriends } from "@/apis/axios";
import { friend, Props } from "@/types/types";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react";
const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    description: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    role: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),

})
function Hero({ friends }: Props) {
    const [load, setload] = useState<boolean>(false)
    const delfriend = async () => {
        try {
            await deletefriend(friends.id)
            window.location.reload()
        } catch (error) {
            console.error('Error creating friend:', error);
            throw error;
        }
    }
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: friends.name,
            description: friends.description,
            role: friends.role,

        },
    })
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setload(true)
        const data: friend = {
            name: values.username,
            description: values.description,
            role: values.role,
        };
        try {
            await UpdateFriends(data, friends.id)
            window.location.reload()
        } catch (error) {
            console.error('Error creating friend:', error);
            throw error;
        } finally {
            setload(false)
        }

    }
    return (

        <div className="flex flex-col gap-6 sm:w-[85%] lg:w-[85%] w-full p-4 border-2 border-white">
            <div className="flex justify-between items-center text-primary">
                <section className="flex items-center gap-2">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    <div>
                        <h1>{friends.name}</h1>
                        <h3>{friends.role}</h3>
                    </div>
                </section>
                <section className="flex items-center gap-4">
                    <MdDelete onClick={delfriend} className="cursor-pointer" />
                    <Dialog>
                        <DialogTrigger><SlNote /></DialogTrigger>
                        <DialogContent>
                            <DialogHeader>

                                <DialogDescription>
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-4">
                                            <FormField
                                                control={form.control}
                                                name="username"
                                                render={({ field }) => (
                                                    <FormItem>

                                                        <FormControl>
                                                            <Input placeholder="shadcn" {...field} />
                                                        </FormControl>

                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="role"
                                                render={({ field }) => (
                                                    <FormItem>

                                                        <FormControl>
                                                            <Input placeholder="shadcn" {...field} />
                                                        </FormControl>

                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="description"
                                                render={({ field }) => (
                                                    <FormItem>

                                                        <FormControl>
                                                            <Input placeholder="shadcn" {...field} />
                                                        </FormControl>

                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />


                                            <Button type="submit" disabled={load}>Submit</Button>
                                        </form>
                                    </Form>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>

                </section>
            </div>
            <h4>{friends.description}</h4>
        </div>
    );
}

export default Hero;
