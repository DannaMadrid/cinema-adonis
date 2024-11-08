import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/projectors", "projectorsController.find");
    Route.get("/projectors/:id", "projectorsController.find");
    Route.post("/projectors", "projectorsController.create");
    Route.put("/projectors/:id", "projectorsController.update");
    Route.delete("/projectors/:id", "projectorsController.delete");
})