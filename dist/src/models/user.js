"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByID = exports.getUserByEmail = exports.getUserByUsername = exports.createUser = void 0;
const database_1 = __importDefault(require("../database"));
const createUser = (user) => {
    return new Promise((resolve, reject) => {
        database_1.default.query('INSERT INTO users SET ?', user, (error, results) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(Object.assign({}, user));
            }
        });
    });
};
exports.createUser = createUser;
const getUserByUsername = (username) => {
    return new Promise((resolve, reject) => {
        database_1.default.query('SELECT * FROM users WHERE username = ?', username, (error, results) => {
            if (error) {
                reject(error);
            }
            else {
                if (results.length === 0) {
                    resolve(null);
                }
                else {
                    resolve(results[0]);
                }
            }
        });
    });
};
exports.getUserByUsername = getUserByUsername;
const getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        database_1.default.query('SELECT * FROM users WHERE email = ?', email, (error, results) => {
            if (error) {
                reject(error);
            }
            else {
                if (results.length === 0) {
                    resolve(null);
                }
                else {
                    resolve(results[0]);
                }
            }
        });
    });
};
exports.getUserByEmail = getUserByEmail;
const getUserByID = (id) => {
    return new Promise((resolve, reject) => {
        database_1.default.query('SELECT * FROM users WHERE id = ?', id, (error, results) => {
            if (error) {
                reject(error);
            }
            else {
                if (results.length === 0) {
                    resolve(null);
                }
                else {
                    resolve(results[0]);
                }
            }
        });
    });
};
exports.getUserByID = getUserByID;
