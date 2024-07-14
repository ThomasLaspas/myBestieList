import { FaPython } from "react-icons/fa";
import { FaReact } from "react-icons/fa";
import { FaFire } from "react-icons/fa";
import { ModeToggle } from "@/components/mode-togle"
import { IoAddCircle } from "react-icons/io5";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CreateFriends } from "@/apis/axios";
import { friend } from "@/types/types";
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
    gender: z.enum(["male", "female", ""], {
        message: "Gender must be either 'male' or 'female'.",
    }),
})

function Header() {
    const [load, setload] = useState<boolean>(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            description: "",
            role: "",
            gender: ""
        },
    })
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setload(true)
        const data: friend = {
            name: values.username,
            gender: values.gender,
            description: values.description,
            role: values.role,
        };
        try {
            await CreateFriends(data)
            window.location.reload()
        } catch (error) {
            console.error('Error creating friend:', error);
            throw error;
        } finally {
            setload(false)
        }

    }
    return (

        <div className="flex items-center justify-center py-6 sm:px-0 px-3">
            <div className="sm:w-1/2 w-full p-4 bg-white text-black flex items-center justify-between" ><div className="flex items-center gap-4 text-3xl"><FaReact />+<FaPython />=<FaFire /></div>
                <div className="flex items-center gap-4 text-3xl ">
                    <ModeToggle />
                    <Dialog>
                        <DialogTrigger><IoAddCircle /></DialogTrigger>
                        <DialogContent>
                            <DialogHeader>

                                <DialogDescription>
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                            <FormField
                                                control={form.control}
                                                name="username"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Username</FormLabel>
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
                                                        <FormLabel>Role</FormLabel>
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
                                                        <FormLabel>Description</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="shadcn" {...field} />
                                                        </FormControl>

                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="gender"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Gender</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select a gender" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="male">Male</SelectItem>
                                                                <SelectItem value="female">Female</SelectItem>

                                                            </SelectContent>
                                                        </Select>

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
                </div></div>
        </div>
    )
}

export default Header