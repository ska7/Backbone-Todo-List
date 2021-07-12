const { v4: uuidv4 } = require("uuid");

const DOMstrings = {
  editBtn: document.getElementById("edit-btn"),
  addBtn: document.getElementById("add-btn"),
  updateBtn: document.getElementById("update-btn"),
  cancelBtn: document.getElementById("cancel-btn"),
  deleteBtn: document.getElementById("delete-btn"),
  todoList: document.getElementById("todo-list"),
  input: document.getElementById("todo-input"),
};

// Backbone Model for a single todo

const Todo = Backbone.Model.extend({
  defaults: {
    todoName: "",
    done: false,
    id: "",
  },
});

// // Backbone Collection where all todos are going to be stored

const Todos = Backbone.Collection.extend({});

// Initialize collection for all todos
const todos = new Todos();

// Backbone View For One Todo

const TodoView = Backbone.View.extend({
  model: new Todo(),
  events: {
    "click #edit-btn": "edit",
    "click #delete-btn": "delete",
  },
  initialize: function () {
    this.template = _.template($("#todo-template").html());
  },
  edit: function () {
    console.log("something");
  },
  delete: function () {
    const toBeDeleted = todos.findWhere({ id: this.model.id });
    console.log("to be deleted", toBeDeleted);
    todos.remove(toBeDeleted);
  },
  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
});

const TodosView = Backbone.View.extend({
  model: todos,
  el: "#todo-list",
  initialize: function () {
    this.model.on("add", this.render, this);
    this.model.on("change", this.render, this);
    this.model.on("remove", this.render, this);
  },
  render: function () {
    const self = this;
    this.$el.html("");

    this.model
      .toArray()
      .forEach((todo) =>
        self.$el.append(new TodoView({ model: todo }).render().$el)
      );
    // console.log(
    //   "weird shit",
    //   new TodoView({ model: new Todo({ todoName: "random" }) }).render().$el[0]
    // );

    return this;
  },
});

// Initialize view for todos
const todosView = new TodosView();

// Backbone View For All Todos.

const AppView = Backbone.View.extend({
  el: $(".todoapp"),
  events: {
    "click #add-btn": "addTodo",
  },

  addTodo: function () {
    const newTodo = new Todo({
      todoName: DOMstrings.input.value,
      done: false,
      id: uuidv4(),
    });
    todos.add(newTodo);
  },
  render: function () {
    this.$el.html("TODO FINALLY ");
  },
});

// Entry point for the app
const App = new AppView();
