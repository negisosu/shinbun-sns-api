import { prisma } from "../lib/prisma"
import { CreateUserInput, UpdateUserInput } from "../types/user.schema"

export const userService = {
    getUsers: async () => {
        try{
            const users = await prisma.user.findMany()
            return users
        }catch(error){
            console.error(error)
            throw error
        }
    },
    getUser: async (id: string) => {
        console.log("getUser",id)
        try{
            const user = await prisma.user.findUnique({
                where: {
                    id: id
                }
            })

            if(!user){
                throw new Error("User Not Found")
            }
            
            return user
        }catch(error){
            console.error(error)
            throw error
        }
    },
    createUser: async (data: CreateUserInput) => {
        try{
            const user = await prisma.user.create({
                data: {
                    id: data.id,
                    name: data.name,
                    email: data.email
                }
            })
            return user
        }catch(error){
            console.error(error)
            throw error
        }
    },
    updateUser: async (data: UpdateUserInput, id: string) => {
        try{
            const user = await prisma.user.update({
                where: {
                    id: id
                },
                data: {
                    name: data.name,
                    email: data.email
                }
            })
            return user
        }catch(error){
            console.error(error)
            throw error
        }
    },
    deleteUser: async (id: string) => {
        try{
            const user = await prisma.user.delete({
                where: {
                    id: id
                }
            })
            return user
        }catch(error){
            console.error(error)
            throw error
        }
    },
}