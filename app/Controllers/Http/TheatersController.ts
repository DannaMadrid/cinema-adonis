import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Theater from "App/Models/Theater";

export default class TheatersController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theTheater: Theater = await Theater.findOrFail(params.id)
            await theTheater.load("projector");
            await theTheater.load("seat")
            return theTheater; // Visualizar un solo elemento 
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1); // Paginas 
                const perPage = request.input("per_page", 20); // Lista los primeros 20
                return await Theater.query().paginate(page, perPage)
            } else {
                return await Theater.query()
            } // Devuelve todos los elementos 

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theTheater: Theater = await Theater.create(body);
        return theTheater;
    }

    public async update({ params, request }: HttpContextContract) {
        const theTheater: Theater = await Theater.findOrFail(params.id);
        const body = request.body();
        theTheater.location = body.location;
        theTheater.capacity = body.capacity;
        return await theTheater.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theTheater: Theater = await Theater.findOrFail(params.id);
            response.status(204);
            return await theTheater.delete();
    }
}
