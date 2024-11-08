import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/screening", "ScreeningsController.find");
    Route.get("/screening/:id", "ScreeningsController.find");
    Route.post("/screening", "ScreeningsController.create");
    Route.put("/screeni-ng/:id", "ScreeningsController.update");
    Route.delete("/screening/:id", "ScreeningsController.delete");
})