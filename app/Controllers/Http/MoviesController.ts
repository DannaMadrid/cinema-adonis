import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import movie from "App/Models/Movie";
import MovieValidator from 'App/Validator/MovieValidator';

export default class MoviesController {


    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let themovie: movie = await movie.findOrFail(params.id)
            return themovie; // Visualizar un solo elemento 
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1); // Paginas 
                const perPage = request.input("per_page", 20); // Lista los primeros 20
                return await movie.query().paginate(page, perPage)
            } else {
                return await movie.query()
            } // Devuelve todos los elementos 

        }

    }
    public async create({ request }: HttpContextContract) {
        await request.validate(MovieValidator) //Antes de crear validar si se creo correctamente 
        const body = request.body();
        const themovie: movie = await movie.create(body);
        return themovie;
    }

    public async update({ params, request }: HttpContextContract) {
        const themovie: movie = await movie.findOrFail(params.id);
        const body = request.body();
        themovie.name = body.location;
        themovie.duration = body.duration;
        themovie.date = body.year;
        return await themovie.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const themovie: movie = await movie.findOrFail(params.id);
            response.status(204);
            return await themovie.delete();
    }
}

