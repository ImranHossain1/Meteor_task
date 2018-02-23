import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Meteor.startup(() => {
	
	const Users = new Mongo.Collection('users');

  // code to run on server at startup
});
