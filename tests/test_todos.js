import test from "ava";
import { Todo } from "../index.js";

test.beforeEach(async (t) => {
  t.context.Todo = new Todo();
  await t.context.Todo.drop_all();
});

// test.afterEach(async t => {
//     await t.context.Todo.drop_all();
// })

test("can insert todo", async (t) => {
  let todo = await t.context.Todo.create("lorem ipsum todo");
  t.truthy(todo);
});

test("can get certain todo", async (t) => {
  let todo_id = await t.context.Todo.create("lorem ipsum todo");
  let todo = await t.context.Todo.get(todo_id);
  t.is(todo.description, "lorem ipsum todo");
});

test("can select all items", async (t) => {
    // No loop here because of inconsistent behavior
  await t.context.Todo.create(`Lorem ipsum 1`);
  await t.context.Todo.create(`Lorem ipsum 2`);
  await t.context.Todo.create(`Lorem ipsum 3`);
  await t.context.Todo.create(`Lorem ipsum 4`);
  await t.context.Todo.create(`Lorem ipsum 5`);

  const all_todos = await t.context.Todo.get_all();
  t.is(all_todos.length, 5);
});

test("can delete a todo", async (t) => {
  let todo_id = await t.context.Todo.create("todo to delete");
  let todo = await t.context.Todo.delete(todo_id);
  t.is(todo, 1);
});
