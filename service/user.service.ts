import { DatabaseClient } from "@/config/databaseClient";

export class UserService extends DatabaseClient {
    public getUsers() {
        return this.db.user.findFirst();
    }
}
