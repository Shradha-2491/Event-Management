import { db } from "./index.js";
import User from "./User.js";
import Attendee from "./Attendee.js";

User.hasMany(Attendee, { foreignKey: "user_id" });
Attendee.belongsTo(User, { foreignKey: "user_id" });

export { db, User, Attendee };