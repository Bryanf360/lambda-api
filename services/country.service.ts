import { prisma } from "../prisma/client";

export class CountryService {

    async getAll(){
        return prisma.country.findMany({
            orderBy: { name: "asc" },
        });
    }

    async create(data: any) {
        if (!data.name) throw new Error ("Country name es requerido");

        const exists = await prisma.country.findUnique({
            where: { name: data.name },
        
        });
        if (exists) throw new Error("Country already exists");

        return prisma.country.create({
            data: { name: data.name }, 
        });
    }

    async update(id: number, data: any) {
        return prisma.country.update({
            where: { country_id: id},
            data,
        });
    }

    async remove(id: number) {
        return prisma.country.update({
            where: { country_id: id},
            data: { status: false },
        });
    }
}