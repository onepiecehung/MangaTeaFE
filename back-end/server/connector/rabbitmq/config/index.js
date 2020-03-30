const JOB_NAME = {
    TEST_RABBIT: 'TEST_RABBIT_DS112',
    SEND_EMAIL: 'SEND_EMAIL',
    REGISTER_BONUS: 'REGISTER_BONUS',
    FORGOT_PASSWORD: "FORGOT_PASSWORD",
    RESEND_OTP: "RESEND_OTP"
};

/**
 * @param RABBIT
 * @param RABBIT.URL
 */

const RABBIT_URL = process.env.RABBIT_URL || `amqp://ds112:ds112@localhost:5672`;

module.exports = {
    JOB_NAME,
    RABBIT_URL
}