const AWS = require("aws-sdk");

const models = require("./models");
require("dotenv").config();

AWS.config.update({ region: "ap-south-1" });

let sqs = new AWS.SQS({ apiVersion: "2012-11-05" });

const sqsParams = {
  QueueUrl: process.env.QUEUE_URL,
  MaxNumberOfMessages: 5,
  VisibilityTimeout: 30,
  WaitTimeSeconds: 0,
};

let { processMessages } = require("./processMessages");

async function sqsReceiveMessage() {
  const queueUrl = process.env.QUEUE_URL;

  const logTag = "[SQS Receive Email Service Message]: ";

  try {
    let data = await sqs.receiveMessage(sqsParams).promise();

    if (!data.Messages || data.Messages.length < 1) {
      console.info(logTag, "[INFO]: ", "Nothing to process");
      setTimeout(sqsReceiveMessage, 5000);
      return;
    }
    let deleteParams = {
      Entries: [],
      QueueUrl: process.env.QUEUE_URL,
    };

    for (let i = 0; i < data.Messages.length; i++) {
      let body = data.Messages[i].Body.toString();

      let bodyJson = JSON.parse(body);

      console.log(bodyJson);

      await processMessages(bodyJson, models, data.Messages[i].MessageId);

      deleteParams.Entries.push({
        Id: i.toString(),
        ReceiptHandle: data.Messages[i].ReceiptHandle,
      });
    }
    if (deleteParams.Entries.length > 0) {
      await sqs.deleteMessageBatch(deleteParams).promise();
    }
  } catch (err) {
    console.error(
      logTag,
      "[ERROR]: ",
      "Error while calling sqs.receiveMessage: ",
      err
    );
  }
  setTimeout(sqsReceiveMessage, 5000);
}

sqsReceiveMessage();
