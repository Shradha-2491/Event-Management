import { DataTypes, Model } from "sequelize";
import { db } from "./index.js";

class Event extends Model { }

Event.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        category: {
            type: DataTypes.STRING,
            allowNull: true
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: "Upcoming"
        },
        created_by: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        created_by_id: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        attendees: {
            type: DataTypes.NUMBER,
            allowNull: true
        }
    },
    {
        sequelize: db,
        modelName: "Event",
        tableName: "events",
        timestamps: false,
        underscored: true
    });

export default Event;
