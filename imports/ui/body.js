import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Mongo } from 'meteor/mongo';
//import { check } from 'meteor/check';


import './body.html';


Users = new Mongo.Collection('users');

Template.users.onCreated(function usersOnCreated() {
  this.state = new ReactiveDict();
});

Template.users.helpers({
	users: function(){
	var instance = Template.instance();

    if (instance.state.get('hideCompleted')) {

      // If hide completed is checked, filter tasks

      return Users.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });

    }
		return Users.find({}, {sort: {createdAt : 1}});
	},

	  incompleteCount() {

    return Users.find({ checked: { $ne: true } }).count();

  },
});


Template.body.events({


//function to insert user

	"submit .add-user" : function(event){

		event.preventDefault();

		var name = event.target.name.value;
		var email = event.target.email.value;
		var phone = event.target.phone.value;
		var dob = event.target.dob.value;


		Users.insert({

			name: name,
			email: email,
			phone: phone,
			dob : dob,
			createdAt : new Date()

		});


		event.target.name.value='';
		event.target.email.value='';
		event.target.phone.value='';
		event.target.dob.value='';

		return false;
	},


});

Template.users.events({
	//function to hide users
	 'change .hide-completed input'(event, instance) {

    instance.state.set('hideCompleted', event.target.checked);

  },


//function to delete user
	"click .delete-user" : function(){
		Users.remove(this._id);
		return false;
	},

	"click .toggle-checked" :function(){
		Users.update(this._id,{$set:{checked: !this.checked}});
	},
});