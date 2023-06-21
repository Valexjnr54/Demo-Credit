import connection from '../database';

interface User {
  id:number;
  fullname: string;
  email: string;
  username: string;
  password: string;
  walletBalance:number;
}

const createUser = (user: User): Promise<User> => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO users SET ?', user, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve({ ...user });
      }
    });
  });
};

const getUserByUsername = (username: string): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM users WHERE username = ?', username, (error, results) => {
      if (error) {
        reject(error);
      } else {
        if (results.length === 0) {
          resolve(null);
        } else {
          resolve(results[0]);
        }
      }
    });
  });
};

const getUserByEmail = (email: string): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM users WHERE email = ?', email, (error, results) => {
      if (error) {
        reject(error);
      } else {
        if (results.length === 0) {
          resolve(null);
        } else {
          resolve(results[0]);
        }
      }
    });
  });
};

const getUserByID = (id: number): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM users WHERE id = ?', id, (error, results) => {
      if (error) {
        reject(error);
      } else {
        if (results.length === 0) {
          resolve(null);
        } else {
          resolve(results[0]);
        }
      }
    });
  });
};

export { User, createUser, getUserByUsername, getUserByEmail, getUserByID };
