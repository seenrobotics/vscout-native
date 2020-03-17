import {ObjectSchema, ObjectPropsType} from 'realm'

export const EventSchema : ObjectSchema=  {
    name : "Event",
    "primaryKey": "id",
	"properties": {
		"id": "int",
        "eventName": "string",
        "eventType": "string",
        "eventDate": "string"
	}   
}