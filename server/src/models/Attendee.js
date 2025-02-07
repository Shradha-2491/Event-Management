import { DataTypes, Model } from "sequelize";
import { db } from "./index.js";

class Attendee extends Model { }

Attendee.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        event_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    },
    {
        sequelize: db,
        modelName: "Attendee",
        tableName: "attendees",
        timestamps: false,
        underscored: true
    });

export default Attendee;