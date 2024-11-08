 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Seat from 'App/Models/Seat';

export default class SeatsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theSeat: Seat = await Seat.findOrFail(params.id)
            await theSeat.load("theater");
            return theSeat; // Visualizar un solo elemento 
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1); // Paginas 
                const perPage = request.input("per_page", 20); // Lista los primeros 20
                return await Seat.query().paginate(page, perPage)
            } else {
                return await Seat.query()
            } // Devuelve todos los elementos 

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theSeat: Seat= await Seat.create(body);
        await theSeat.load("theater");
        return theSeat;
    }

    public async update({ params, request }: HttpContextContract) {
        const theSeat: Seat = await Seat.findOrFail(params.id);
        const body = request.body();
        theSeat.location = body.location;
        theSeat.reclining = body.reclining;
        theSeat.theater_id = body.theaters_id;
        return await theSeat.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theSeat: Seat = await Seat.findOrFail(params.id);
            response.status(204);
            return await theSeat.delete();
    }
}
