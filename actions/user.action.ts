import { DatabaseClient } from "@/config/databaseClient";

export class UserAction extends DatabaseClient {
  public getUsers() {
    return this.db.user.findFirst();
  }
}
