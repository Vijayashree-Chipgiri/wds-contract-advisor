/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
'use strict';

let express = require("express");
require('dotenv').config(); // reads environment variables from .env
let http = require("http");
let https = require("https");
const watson = require('watson-developer-cloud');
const bodyParser = require('body-parser');
const constants = require('./constants');
const config = require('./config');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
let cfenv = require("cfenv");

// create a new express server
let app = express();
//let rest = require('./routes/rest');
let Client = require("node-rest-client").Client;
let client = new Client();
// get the app environment from Cloud Foundry
let appEnv = cfenv.getAppEnv();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Setting ejs as the rendering engine to use html
app.set('public', __dirname + '/public');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

const conversation = new watson.ConversationV1({version_date: watson.ConversationV1.VERSION_DATE_2017_05_26});
const discovery = new watson.DiscoveryV1({version_date: watson.DiscoveryV1.VERSION_DATE_2017_08_01});

// Passes a message to the Conversation Service
//let response_json = {};
let claims_from_mock_list;
let index_of_claims;
let context = null;

// Synchronous call to message to send question and context and receive data
const message = function(text, context) {
  const payload = {
    workspace_id: config.conversation.workspace_id || '<workspace_id>',
    input: {
      text: text
    },
    context: context,
    alternate_intents: true
  };
  return new Promise((resolve, reject) => conversation.message(payload, function(err, data) {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  }));
};

// Synchronous query to Watson Discovery
const discovery_query = function(query, filter = '', aggregation = '', count = '10', returnFilter = '') {
  const params = {
    environment_id: config.discovery.environment_id || '<envionment_id>',
    collection_id: config.discovery.collection_id || '<collection_id>',
    query: query,
    filter: filter,
    aggregation: aggregation,
    count: count,
    return: returnFilter
  };
  return new Promise((resolve, reject) => discovery.query(params, function(err, data) {
    if (err) {
	  //console.log("Error is--"+err);	
      reject(err);
    } else {
	   //console.log("Success is--"+JSON.stringify(data));
      resolve(data);
    }
  }));
};

// This makes a call to the mock service to authenticate the user.

const build_json_conversation_response = function(status, answer) {
  return {'status': status, 'answer': answer};
};


app.get("/", function(req, res) {
  res.render('index', {message: ""});
});


app.get('/get-conversation-service', function(req, res) {
    console.log('LEDon button pressed!');
	let question = req.query.question;
	
      console.log("Question is---"+question);
		let context = {"value":true};
		const payload = {
			workspace_id: 'd0a1d757-3505-4226-a409-12cb41d73ffd',
			input: {
			  text: question
			},
			context: context,
			alternate_intents: true
		  };
		  return new Promise((resolve, reject) => conversation.message(payload, function(err, data) {
			if (err) {
				console.log("Error "+err);
				res.json(build_json_conversation_response(constants.CONVERSATION_SUCCESS,err));
				res.end();
				reject(err);
			} else {
				if (data.context.action === constants.GET_ANSWER_FROM_DISCOVERY) {
					const discovery_call = data.input.text;
					discovery_query(discovery_call).then(discovery_response => {
					  // Parse response as a JSON object
					  let answer = "";
					  if (discovery_response.results[0] && discovery_response.results[0].Extract) {
						let best_response = discovery_response.results[0];
						//answer = "I found an answer in the " + best_response.headers + " section of the document:\n" + best_response.text;
						answer = best_response.Extract;
					  }
					  context.answer = encodeURIComponent(answer);
					  res.json(build_json_conversation_response(constants.CONVERSATION_SUCCESS, answer));
					  res.end();
					  /*message('', context).then(response => {
						context = response.context;
						const options = response.output.options;
						let answer_2 = "Sorry, something went wrong";
						if (response.output && response.output.text) {
						  answer_2 = response.output.text;
						} else if (response.error) {
						  answer_2 = answer_2 + response_1.error;
						}
						console.log("Answer 2 is---"+answer_2);
						res.json(build_json_conversation_response(constants.CONVERSATION_SUCCESS, answer_2));
						res.end();
					  }).catch(err => {
						res.json(build_json_conversation_response(constants.CONVERSATION_ERROR, constants.CONVERSATION_ERROR_MESSAGE + err.message));
						res.end();
					  });*/
					}).catch(error => {
						res.json(build_json_conversation_response(constants.CONVERSATION_ERROR, constants.CONVERSATION_ERROR_MESSAGE + err.message));
						res.end();
					});
				}else{
					let answer = data.output.text;
					resolve(data);
					res.json(build_json_conversation_response(constants.CONVERSATION_SUCCESS, answer));
					res.end();
				}
			}
		  }));
		
	

	  
	  
});

app.get('/get-discovery-service', function(req, res) {
    console.log('discovery button pressed!');
	let question = req.query.question;
	console.log('question--'+question);
	const discovery_call = question;
	let context = {"value":true};
	discovery_query(discovery_call).then(discovery_response => {
	  // Parse response as a JSON object
	  console.log("discovery_response---"+JSON.stringify(discovery_response));
	  let answer = "";
	  if (discovery_response.results[0] && discovery_response.results[0].Extract) {
		let best_response = discovery_response.results[0];
		//answer = "I found an answer in the " + best_response.headers + " section of the document:\n" + best_response.text;
		answer = best_response.Extract;
	  }
	  context.answer = encodeURIComponent(answer);
	  res.json(build_json_conversation_response(constants.CONVERSATION_SUCCESS, discovery_response.results));
	  res.end();
	}).catch(error => {
		res.json(build_json_conversation_response(constants.CONVERSATION_ERROR, constants.CONVERSATION_ERROR_MESSAGE + error.message));
		res.end();
	});
	  
	  
});
// start server on the specified port and binding host
app.listen(appEnv.port, "0.0.0.0", function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});

module.exports = {
  helloWorld: function(name) {
    return helloWorld(name);
  },

  message: function(text, context) {
    return message(text, context);
  },

  discovery_query: function(query, filter, aggregation, count, returnFilter) {
    return discovery_query(query, filter, aggregation, count, returnFilter)
  },
  conversation: conversation,
  discovery: discovery
};
