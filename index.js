import { knex_db } from "./db/index.js";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

dotenv.config();

export class Todo {
  constructor() {
    this.table = "todos";
    this.knex = knex_db(process.env.NODE_ENV);
  }

  create = async (description) => {
    try {
      let todo = await this.knex(this.table).insert({
        description,
        completed: false,
      });
      return todo[0];
    } catch (error) {
      console.log(error);
    }
  };

  get = async (id) => {
    try {
      const todo = await this.knex(this.table).where({ id }).select("*");
      return await todo[0];
    } catch (error) {
      console.log(error);
    }
  };

  get_all = async () => {
    try {
      let todos = await this.knex(this.table).select("*");
      return todos;
    } catch (error) {
      console.log(error);
    }
  };

  delete = async (id) => {
    try {
      let todo = this.get(id);
      todo = await this.knex(this.table).where({ id }).del();
      return todo;
    } catch (error) {
      console.log(error);
    }
  };

  drop_all = async () => {
    try {
      await this.knex(this.table).del();
    } catch (error) {
      console.log(error);
    }
  };
}

export default {
  Todo,
};
