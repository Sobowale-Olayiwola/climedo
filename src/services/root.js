class RootService {
  /**
     * Removes all JOI Validator decoration from Error messages
     * @method
     * @param {string} message The error.message string thrown from JOI Validation when
     * a property does not match the specification.
     * @returns {string} Formatted version of JOI message string.
     */
  static filterJOIValidation(message) {
    const regex = /["]+/g;
    return message.replace(regex, '');
  }

  /**
     *
     * This methods is used to format all Failed responses
     * @method
     * @property {string} message The error message
     * @property {number} code The status code
     * @returns {object} This always has error set to a string and payload to null.
     */
  static processFailedResponse({ message, code = 400, success = false }) {
    return {
      success,
      error: message,
      payload: null,
      status: code,
    };
  }

  /**
     *
     * This methods is used to format all successful responses and is called internally only
     * @method
     * @property {object} payload The payload
     * @property {number} code The status code
     * @property {boolean} sendRawResponse defines response medium
     * @property {string} responseType A string defining the response type to return
     * @returns {object} This always has error set to null and payload an object.
     */
  static processSuccessfulResponse({
    success = true,
    message,
    payload,
    code = 200,
    sendRawResponse = false,
    responseType = 'application/json',
  }) {
    return {
      success,
      message,
      payload,
      error: null,
      responseType,
      sendRawResponse,
      status: code,
    };
  }
}

export default RootService;
