const Chats = new Mongo.Collection('chats');
Chats.insert({ name: "GE Building"});
Chats.insert({ name: "Riverfront"});
import {SimpleChat} from 'meteor/cesarve:simple-chat/config'
SimpleChat.configure({
    beep: false,
    showViewed: true,
    showReceived: true,
    showJoined: true,
})

bubbles = [
{
"id": "osu",
"name": "OSU",
"left": -83.048049,
"right": -82.997284,
"top": 40.019415,
"bottom": 39.989883
},
{ 
"id":"uc",
"name": "Bearcat Babies",
"left": -84.519341,
"right": -84.509236,
"top": 39.135752,
"bottom": 39.124469
}
];

function randomname(){
  var firsts = ['fuzzy', 'sexy', 'purple', 'hungry', 'happy', 'bubbly', 'hairy', 'large', 'sophisticated'];
  var lasts = ['Cardale', 'Barrett', 'Zeke', 'Buckeye', 'Pablo', 'Urban', 'Meyer', 'Gee', 'Drake', 'AfroDuck'];
  var name = "";
  name += firsts[Math.floor(Math.random() * firsts.length)];
  name += lasts[Math.floor(Math.random() * lasts.length)];
  name += Math.floor(Math.random() * 70);
  return name;
}
if (Meteor.isClient) {


    Template.bubbleLi.helpers({
        'username': function() {
          return randomname();
        }
    });
    Template.home.helpers({
        'random': function () {
            return Random.id(5)
        },
        'bubbles': function () {
          return bubbles;
        },
        'chats': function () {
          return Chats.find({});
        }
    });
    
    Template.home.onRendered(function () {
      //alert("home renderd");
    });

    Template.room.onRendered(function () {
        var self = this

        return Session.set('avatar', "/avatar" + (Math.floor(Math.random() * 5) + 1) + ".png")


    })

    Template.room.helpers({
        'roomId': function () {
            return FlowRouter.getParam('roomId')
        },
        'username': function () {
            return FlowRouter.getQueryParam('username')
        },
        avatar: function () {
            return Session.get('avatar')
        }

    });


}

FlowRouter.route("/", {
    name: "home",
    action: function () {
        BlazeLayout.render("home");
    },
    waitOn: function() { return Meteor.subscribe('chats'); }
})
FlowRouter.route("/:roomId", {
    name: "room",
    action: function () {
        BlazeLayout.render('room')
    }
})
