import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Screening from 'App/Models/Screening';

export default class ScreeningsController {
    

    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let thescreening: Screening = await Screening.findOrFail(params.id)
            await thescreening.load('movie')
            await thescreening.load('theater')
            return thescreening; // Visualizar un solo elemento 
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1); // Paginas 
                const perPage = request.input("per_page", 20); // Lista los primeros 20
                return await Screening.query().preload('theater').preload('movie').paginate(page, perPage)
            } else {
                return await Screening.query().preload('theater').preload('movie')
            } // Devuelve todos los elementos 

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const thescreening: Screening = await Screening.create(body);
        return thescreening;
    }

    public async update({ params, request }: HttpContextContract) {
        const thescreening: Screening = await Screening.findOrFail(params.id);
        const body = request.body();
        thescreening.date = body.date;
        thescreening.theater_id = body.theater_id;
        thescreening.movie_id = body.movie_id;
        return await thescreening.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const thescreening: Screening = await Screening.findOrFail(params.id);
            response.status(204);
            return await thescreening.delete();
    }
}
