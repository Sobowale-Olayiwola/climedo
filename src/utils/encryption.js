/**
 * This module handles all the Application wide encryption tasks
 * @module UTILITY:Encryption
 */
import { promisify } from 'util';
import { genSalt, hash, compare } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import env from '../config/env';

const { SALT, SIGNATURE } = env;

/**
  * Hashes and the returns the hash of the object passed in as parameter.
  * @async
  */
async function hashObject(objectToHash) {
  const salt = await genSalt(Number(SALT));
  const hashedObject = await hash(objectToHash, salt);
  return hashedObject;
}

/**
  * Compares two object sentObject (what you want to verify) and the accurateObject
  * (the single source of truth).
  * Returns a boolean or error.
  * @async
  */
async function verifyHash({ sentObject, accurateObject }) {
  const bool = await compare(sentObject, accurateObject);
  return bool;
}

const signJWT = promisify(sign);
/**
  * Generates and returns a JWT using the payload and expirationTime,
  *  the expirationTime has a default of 6 hours.
  * @async
  */
async function generateToken({ payload, expirationTime = '1h' }) {
  const token = await signJWT(payload, `${SIGNATURE}`, { expiresIn: expirationTime });
  return token;
}

const verifyJWT = promisify(verify);
/**
  * Checks the validity of a JWT. Returns a boolean or error if any.
  * @async
  */
async function decodeToken(token) {
  const bool = await verifyJWT(token, SIGNATURE);
  return bool;
}
export {
  decodeToken, generateToken, hashObject, verifyHash,
};
