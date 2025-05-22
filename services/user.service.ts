import { prisma } from "../lib/prisma"
import { CreateUserInput, UpdateUserInput, User } from "../types/user.schema"

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
    createUser: async (data: User) => {
        try{
            const user = await prisma.user.create({
                data: data
            })
            return user
        }catch(error){
            console.error(error)
            throw error
        }
    },
    updateUser: async (data: User) => {
        try{
            const user = await prisma.user.update({
                where: {
                    id: data.id
                },
                data: data
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