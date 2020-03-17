import Realm, {ObjectSchema} from 'realm'
import {EventSchema, MatchSchema } from './schemas'

const realm = new Realm({
    schema : [
        MatchSchema,
        EventSchema
    ],
    schemaVersion: 0,
    deleteRealmIfMigrationNeeded: true
});

export const deleteRealm = async () => {
	try {
		await realm.write(async () => {
			realm.deleteAll();
		});
	} catch (err) {
		if (err) Promise.reject(err);
	}
};

export default realm;