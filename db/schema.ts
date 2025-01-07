// model/schema.js
import { appSchema, tableSchema } from "@nozbe/watermelondb";

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "password",
      columns: [
        { name: "title", type: "string" },
        { name: "username", type: "string", isOptional: true },
        { name: "password", type: "string" },
        { name: "pin", type: "string" },
        { name: "create_at", type: "string" },
        { name: "update_at", type: "string" },
        { name: "delete_at", type: "string" },
      ],
    }),
  ],
});
