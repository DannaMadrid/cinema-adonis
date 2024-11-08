import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/seats", "seatsController.find");
    Route.get("/seats/:id", "seatsController.find");
    Route.post("/seats", "seatsController.create");
    Route.put("/seats/:id", "seatsController.update");
    Route.delete("/seats/:id", "seatsController.delete");
})