import { Model } from "@nozbe/watermelondb";
import { field, text } from "@nozbe/watermelondb/decorators";

export default class Password extends Model {
  static table = "password";

  @text("title") title;
  @field("username") username;
  @field("password") password;
  @field("pin") pin;
  @field("create_at") create_at;
  @field("update_at") update_at;
  @field("delete_at") delete_at;
}
