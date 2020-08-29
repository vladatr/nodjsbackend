const router = require("express").Router();
const asyncWrapper = require("../utilities/async-wrapper").AsyncWrapper;
const UsersService = require("../services/users-service");
const validator = require("../middleware/validator");

const userService = new UsersService();

router.get("/", asyncWrapper(async (req, res) => {
    const users = await userService.findAll();
    res.send(users);
}));

router.get("/:id", asyncWrapper(async (req, res) => {
    const id = req.params.id;
    const user = await userService.findOne(id);
    res.send(user);
}));

router.post("/", [validator("User")], asyncWrapper(async (req, res) => {
    const user = await userService.create(req.body);
    res.send(user);
}));

router.delete("/:id", asyncWrapper(async (req, res) => {
    const id = req.params.id;
    userService.deleteOne(id);
    res.sendStatus(200);
}));

module.exports = router;