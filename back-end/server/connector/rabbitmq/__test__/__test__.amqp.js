const RABBIT = require("../init");
import {
  JOB_NAME
} from "../../../../globalConstant/index"

RABBIT.consumeData(JOB_NAME.TEST_RABBIT, async (msg, channel) => {
  try {
    let message = JSON.parse(msg.content.toString());
    console.log('rabbitmq: ' + message.msg);
    return true;
  } catch (error) {
    console.error('TEST_AMQP error');
    console.error(error);
    return true;
  }
});
