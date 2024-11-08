import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Projector from 'App/Models/Projector';

export default class ProjectorsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theprojector: Projector = await Projector.findOrFail(params.id)
            await theprojector.load("theater");
            return theprojector; // Visualizar un solo elemento 
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1); // Paginas 
                const perPage = request.input("per_page", 20); // Lista los primeros 20
                return await Projector.query().paginate(page, perPage)
            } else {
                return await Projector.query()
            } // Devuelve todos los elementos 

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theProjector: Projector= await Projector.create(body);
        await theProjector.load("theater");
        return theProjector;
    }

    public async update({ params, request }: HttpContextContract) {
        const theprojector: Projector = await Projector.findOrFail(params.id);
        const body = request.body();
        theprojector.brand = body.brand;
        theprojector.high = body.high;
        theprojector.width = body.width;
        theprojector.teather_id = body.theaters_id;
        return await theprojector.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theprojector: Projector = await Projector.findOrFail(params.id);
            response.status(204);
            return await theprojector.delete();
    }
}
