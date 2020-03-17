const RABBIT = require('../init');
import {
  JOB_NAME
} from "../../../../globalConstant/index"

function testAMQP() {
  RABBIT.sendDataToRabbit(JOB_NAME.TEST_RABBIT, { msg: '[RABBIT] Test ampq success.' });
}

module.exports = {
  testAMQP
};
