"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const prisma_1 = require("../lib/prisma");
exports.userService = {
    getUsers: async () => {
        try {
            const users = await prisma_1.prisma.user.findMany();
            return users;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    },
    getUser: async (id) => {
        console.log("getUser", id);
        try {
            const user = await prisma_1.prisma.user.findUnique({
                where: {
                    id: id
                }
            });
            if (!user) {
                throw new Error("User Not Found");
            }
            return user;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    },
    createUser: async (data) => {
        try {
            const user = await prisma_1.prisma.user.create({
                data: {
                    id: data.id,
                    name: data.name,
                    email: data.email
                }
            });
            return user;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    },
    updateUser: async (data, id) => {
        try {
            const user = await prisma_1.prisma.user.update({
                where: {
                    id: id
                },
                data: {
                    name: data.name,
                    email: data.email
                }
            });
            return user;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    },
    deleteUser: async (id) => {
        try {
            const user = await prisma_1.prisma.user.delete({
                where: {
                    id: id
                }
            });
            return user;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    },
};
