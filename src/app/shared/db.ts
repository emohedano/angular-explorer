import PouchDB from 'pouchdb';
import { environment } from '../../environments/environment';

PouchDB.plugin(require('pouchdb-authentication'));

export const db = new PouchDB(environment.apiBaseUrl, { skipSetup: true });
