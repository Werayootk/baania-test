import * as dotenv from "dotenv";
dotenv.config();
import * as cors from "cors";
import * as express from "express";
import { json } from "body-parser";
import { AppDataSource } from "./data-source"
import { House } from "./entity/House"
import { User } from "./entity/User"

const app = express();
app.use(cors());
app.use(json({ limit: "50mb" }));

// Health Check
app.get("/", (_, res) => {
  res.send("OK");
});

AppDataSource.initialize().then(async () => {

    console.log("Inserting a new user into the database...")
    const user = new User()
    user.firstName = "Timber"
    user.lastName = "Saw"
    user.age = 25
    await AppDataSource.manager.save(user)
    console.log("Saved a new user with id: " + user.id)

    console.log("Loading users from the database...")
    const users = await AppDataSource.manager.find(User)
    console.log("Loaded users: ", users)

    console.log("Inserting a new user into the database...")
    const house = new House()
    house.name = "test1"
    house.post_code = "test1"
    house.desc = "test1"
    house.price = "123.0"
    await AppDataSource.manager.save(house)
    console.log("Saved a new house with id: " + house.id)

    console.log("Loading users from the database...")
    const houses = await AppDataSource.manager.find(House)
    console.log("Loaded users: ", houses)

    const PORT = parseInt(process.env.PORT) || 8000;
    const HOSTNAME = "0.0.0.0";
    const server: any = app.listen(PORT, HOSTNAME, () => {
        console.log(`server is running on HOSTNAME: ${HOSTNAME}:${PORT}`);
    });

}).catch(error => console.log(error))
