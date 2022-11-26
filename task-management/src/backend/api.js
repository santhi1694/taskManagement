import { ERROR, SUCCESS } from "../constants/constants";
import { db } from "./db";
const { users,tasks } = db;

export const getUser = (username) => users.get({ username });
export const addUser = (data) => users.add(data);

export const loginUser = async (data) => {
  const { username, password } = data;
  if (!username || !password) {
    return { type: ERROR, data: {message: "Mandatory fields are missing !"} };
  }

  const userData = await users.get({ username });

  if (userData) {
    const isPassMatched = data.password === userData.password;
    if (!isPassMatched)
      return { type: ERROR, data: {message: "Password does not match!"} };
    return { type: SUCCESS, data :{message: "Logged in successfully", data: userData }};
  }

  const id = await users.add(data);
  console.log("id", id)
  return { type: SUCCESS, data:{message: "User created successfully", data: {...data,id} }};
};

export const addTask = async (data) => {
    const { title} = data;
    if(!title) {      
        return {type: ERROR, data: {message: 'mandatory fields are missing!'}}
    }
    await tasks.add({...data, status: false})
    return {type: SUCCESS, data: {message: 'Task Added successfully!'}}
}