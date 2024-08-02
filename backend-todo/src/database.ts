// import process from "process";
import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
    type: process.env.NODE_ENV === "production" ? "mysql" : "sqlite",
    database:
        process.env.NODE_ENV === "production" ? "prod_db_name" : "database.sqlite",
    entities: [],
    synchronize: true,
});

export const databaseInit = async() => {
    try {
        await AppDataSource.initialize();
        console.log("Database connection established.");
    } catch (error) {
        console.error("Database connection failed:", error); 
    }
}