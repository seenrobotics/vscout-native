import {ObjectSchema} from 'realm'


export const MatchSchema : ObjectSchema = {
    "name" : "Match",
    "primaryKey": "id",
	"properties": {
		"id": "int",
        "eventId": "int",
        "blueTeamTop": "string",
        "blueTeamBottom": "string",
        "redTeamTop": "string",
        "redTeamBottom": "string",
        "blueScore": "int",
        "redScore": "int"
	}
}