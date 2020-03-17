const RABBIT = require("./init");
import {
  JOB_NAME
} from "../../../globalConstant/index"
import logger from "../../../util/logger"

async function createQueue() {
  try {
    await RABBIT.initChannel();
    RABBIT.initQueue(JOB_NAME.TEST_RABBIT, false);
    RABBIT.initQueue(JOB_NAME.SEND_EMAIL, false);
    RABBIT.initQueue(JOB_NAME.REGISTER_BONUS, false);
    RABBIT.initQueue(JOB_NAME.FORGOT_PASSWORD, false);
    RABBIT.initQueue(JOB_NAME.RESEND_OTP, false);
    logger.info('AMPQ queue is running...');
  } catch (error) {
    logger.error('AMPQ: createQueue initChannel error:');
    logger.error(error);
  }
}

function createWorkers() {
  RABBIT.initChannel().then(() => {
    require('./channel.rabbit');
    logger.info('AMPQ worker is running...');
  }).catch(error => {
    logger.error('AMPQ: createWorkers initChannel error:');
    logger.error(error);
  });
}

module.exports = {
  createWorkers,
  createQueue
};
