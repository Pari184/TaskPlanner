// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"task.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//import TaskManager from "./taskmanager.js";
var Task = /*#__PURE__*/function () {
  function Task(id, name, description, assignee, date, status) {
    _classCallCheck(this, Task);

    this.id = id;
    this.name = name;
    this.description = description;
    this.assignee = assignee;
    this.date = date;
    this.status = status;
    this.isDelete = false;
  } // Function to set the HTML code for all task


  _createClass(Task, [{
    key: "toHTMLString",
    value: function toHTMLString() {
      var HTML = "\n        <div class=\"card-body py-3\">\n        <div class=\"row no-gutters align-items-center\" id=\"taskEdit\">\n            <div class=\"col\"> <p class=\"text-big\"   id=\"".concat(this.id, "\" data-abc=\"true\">").concat(this.name, "</p>\n            <p class=\"text-big\">").concat(this.description, "-").concat(this.assignee, "-").concat(this.date, "-").concat(this.status, "</p>\n            </div>\n            <div class=\"col-3 text-muted\">               \n                <button class=\"edit btn btn-primary ml-2\"><i class=\"icon-edit\" style=\"font-size:36px;color:blue\"></i></i></button>\n                <button class=\"delete btn btn-danger\"><i class=\"fas fa-trash-alt\" style=\"font-size:36px;color:red\"></i></i></button>               \n            </div>\n        </div>\n        </div>\n        <hr class=\"m-0\">\n    ");
      return HTML;
    } // Function to create HTML elements for task

  }, {
    key: "toHtmlElement",
    value: function toHtmlElement(editTaskClicked, deleteTaskClicked) {
      var html = this.toHTMLString();
      var element = document.createRange().createContextualFragment(html);
      element.querySelector("button.edit").addEventListener("click", editTaskClicked);
      element.querySelector("button.delete").addEventListener("click", deleteTaskClicked);
      return element;
    }
  }]);

  return Task;
}();

exports.default = Task;
},{}],"taskmanager.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _task = _interopRequireDefault(require("./task.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TaskManager = /*#__PURE__*/function () {
  function TaskManager(parent, editTaskClicked, deleteTaskClicked) {
    _classCallCheck(this, TaskManager);

    this.tasks = [];
    this.currentId = 1;
    this.parent = parent;
    this.editTaskClicked = editTaskClicked;
    this.deleteTaskClicked = deleteTaskClicked;
  } // Function to add a task after successful validation and push the task to tasks array.


  _createClass(TaskManager, [{
    key: "addTask",
    value: function addTask(name, description, assignee, date, status) {
      var task = new _task.default("task".concat(this.currentId++), name, description, assignee, date, status);
      this.tasks.push(task);
    } // Function to update the task with new edited values after successful validation.

  }, {
    key: "updateTask",
    value: function updateTask(id, name, description, assignee, date, status) {
      for (var i = 0; i < this.tasks.length; i++) {
        if (this.tasks[i].id == id) {
          this.tasks[i].name = name;
          this.tasks[i].description = description;
          this.tasks[i].assignee = assignee;
          this.tasks[i].date = date;
          this.tasks[i].status = status; //this.display();
          //break;
        }
      }
    } // Function for deleting a task whose id is passed.

  }, {
    key: "deleteTask",
    value: function deleteTask(id) {
      this.tasks = this.tasks.filter(function (t) {
        return t.id !== id;
      }); //this.display();
    } // To display all the tasks from "tasks" array.

  }, {
    key: "display",
    value: function display() {
      var _this = this;

      this.parent.innerHTML = "";
      var cardheading = "<div class=\"card mb-3\" id=\"tasksummary\">\n        <div class=\"card-header pl-0 pr-0\">\n            <div class=\"row no-gutters w-100 align-items-center\">\n                <div class=\"col ml-3\">Tasks</div>\n                <div class=\"col-3 text-muted\">\n                    <div class=\"row no-gutters align-items-center\">\n                        <div class=\"col\">Edit/Delete</div>\n                    </div>\n                </div>\n            </div>\n        </div>";

      if (this.tasks.length < 1) {
        cardheading = "";
      } else {
        var helement = document.createRange().createContextualFragment(cardheading);
        this.parent.append(helement);
        this.tasks.forEach(function (task) {
          var taskElement = task.toHtmlElement(_this.editTaskClicked, _this.deleteTaskClicked);

          _this.parent.append(taskElement);
        });
      }
    }
  }]);

  return TaskManager;
}();

exports.default = TaskManager;
},{"./task.js":"task.js"}],"script1.js":[function(require,module,exports) {
"use strict";

var _task = _interopRequireDefault(require("./task.js"));

var _taskmanager = _interopRequireDefault(require("./taskmanager.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Class for creating task
var checkValidName = false; //global variable

var checkValidDesc = false; //global variable

var checkValidAssignee = false;
var checkValidStatus = false;
var checkValidDate = false; // Class for managing and accessing the task

/* code for card heading 
        <div class="card mb-3">
            <div class="card-header pl-0 pr-0">
                <div class="row no-gutters w-100 align-items-center">
                    <div class="col ml-3">Tasks</div>
                    <div class="col-4 text-muted">
                        <div class="row no-gutters align-items-center">
                            <div class="col">Edit/Delete</div>
                        </div>
                    </div>
                </div>
            </div>
*/

/*const taskContainer = document.querySelector(".addModal");

const createTask = document.querySelector("#addTask");
createTask.addEventListener("click", validation);

function validation(){
    const taskname = document.querySelector("#")
    //validation for all fields
}*/

var taskContainer = document.querySelector('#tasksummary');
var taskManager = new _taskmanager.default(taskContainer, editTaskClicked, deleteTaskClicked); //const editbtn;
//const taskContainer = document.querySelector('#tasks');
//const createButton = document.querySelector('.addTask');
//createButton.addEventListener("click", createTaskClicked);

var taskForm = document.querySelector('#task-form');
var taskIdInput = document.querySelector('#task-id'); //taskForm.addEventListener("addTask", taskFormSubmitted);
//const modalElement = document.querySelector('#addModal');

var addBtn = document.querySelector("#addTask");
var edttask = document.querySelector("#editTask");

addBtn.onclick = function () {
  var name = document.querySelector("#taskName");
  var description = document.querySelector("#textDescription");
  var assignee = document.querySelector("#assignedTo");
  var date = document.querySelector("#dueDate");
  var status = document.querySelector("#taskStatus"); // const mode = "ADD";
  // validateFormElements(name,description,assignee,date,mode);
  // if (checkValidName && checkValidDesc && checkValidAssignee ) {
  //     //const taskContainer = document.querySelector('#tasksummary');
  //     addBtn.focus();

  taskManager.addTask(name.value, description.value, assignee.value, date.value, status.value);
  taskManager.display(); //taskContainer.append(element);
  //const element = newta.toHTMLString();
  //taskContainer.innerHTML = "";
  //taskManager.addTaskToPage(task);
  //document.forms["#task-form"].reset();

  document.querySelector("#task-form").reset(); //document.getElementsByClassName(".spanclass").hide();

  resetValidationMessages();
  $("#addModal").modal("hide"); //    } 
  // else {
  //     return false;
  // }
};

function validateFormElements(name, description, assignee, dueDate, mode) {
  var errMsg1 = "";
  var errMsg2 = "";
  var errMsg3 = "";
  var errMsg4 = "";

  if (mode == "ADD") {
    errMsg1 = "#errMsg1";
    errMsg2 = "#errMsg2";
    errMsg3 = "#errMsg3";
    errMsg4 = "#errMsg4";
  } else {
    errMsg1 = "#errMsg6";
    errMsg2 = "#errMsg7";
    errMsg3 = "#errMsg8";
    errMsg4 = "#errMsg9";
  }

  if (name.value == "" || name.value.length < 8) {
    setErrorMessage("This field cannot be blank, must be 8 chars long and can be alpha numeric", errMsg1);
    name.style.borderColor = "red";
    name.focus();
    checkValidName = false;
  } else {
    setValidationSuccessMessage(errMsg1);
    name.style.border = "none";
    checkValidName = true;
  }

  if (description.value == "" || description.value.length < 15) {
    setErrorMessage("This field cannot be blank and must be 15 chars long", errMsg2);
    description.style.borderColor = "red";
    description.focus();
    checkValidDesc = false;
  } else {
    setValidationSuccessMessage(errMsg2);
    description.style.border = "none";
    checkValidDesc = true;
  }

  if (assignee.value == "" || assignee.value.length < 8) {
    setErrorMessage("This field cannot be blank and must be 8 chars long", errMsg3);
    assignee.style.borderColor = "red";
    assignee.focus();
    checkValidAssignee = false;
  } else {
    setValidationSuccessMessage(errMsg3);
    assignee.style.border = "none";
    checkValidAssignee = true;
  } // var currentDate = new Date();
  // dueDateValue = new Date(dueDate.value);
  // if (dueDateValue.value == undefined || dueDateValue < currentDate){
  //     setErrorMessage("The date is lesser than current date",errMsg4);
  //     dueDate.style.borderColor = "red";
  //     dueDate.focus();
  //     checkValidDate = false;
  // }
  // else{
  //     setValidationSuccessMessage(errMsg4);
  //     dueDate.style.border = "none";
  //     checkValidDate = true;
  // }

}

function setErrorMessage(errorDesc, errorElement) {
  var errMsg = document.querySelector(errorElement);
  errMsg.innerHTML = errorDesc;
  errMsg.style.color = "red";
}

function setValidationSuccessMessage(errorElement) {
  var errMsg = document.querySelector(errorElement);
  errMsg.innerHTML = "Looks Good";
  errMsg.style.color = "green";
}

function resetValidationMessages() {
  $("#errMsg1").innerHTML = "";
  $("#errMsg2").innerHTML = "";
  $("#errMsg3").innerHTML = "";
  $("#errMsg4").innerHTML = "";
  $("#errMsg6").innerHTML = "";
  $("#errMsg7").innerHTML = "";
  $("#errMsg8").innerHTML = "";
  $("#errMsg9").innerHTML = "";
}

;

edttask.onclick = function () {
  var tid = document.getElementById("editTaskID");
  var tname = document.getElementById("editTaskName");
  var tdesc = document.getElementById("editTextDescription");
  var tassignee = document.getElementById("editAssignedTo");
  var tdate = document.getElementById("editDueDate");
  var tstatus = document.getElementById("editTaskStatus");
  var errMsg1 = document.querySelector("#errMsg6");
  var errMsg2 = document.querySelector("#errMsg7");
  var errMsg3 = document.querySelector("#errMsg8");
  var errMsg4 = document.querySelector("#errMsg9");
  var mode = "Edit";
  validateFormElements(tname, tdesc, tassignee, tdate, mode); //later call the validation function.

  if (checkValidName && checkValidDesc && checkValidAssignee && checkValidDate) {
    taskManager.updateTask(tid.value, tname.value, tdesc.value, tassignee.value, tdate.value, tstatus.selected);
    resetValidationMessages();
    $("#editModal").modal("hide");
  } else $("#editModal").focus(); // else {
  //     return false;
  // }

};

function editTaskClicked(event) {
  var currentElement = $(this.parentElement).closest("#taskEdit")[0].getElementsByTagName("p");
  var taskID = currentElement[0].id;
  var taskName = currentElement[0].innerText;
  var contentsToSplit = currentElement[1].innerText.split('-');
  var taskDesc = contentsToSplit[0];
  var taskAssignee = contentsToSplit[1];
  var taskDate = contentsToSplit[2] + "-" + contentsToSplit[3] + "-" + contentsToSplit[4];
  var taskStatus = contentsToSplit[5];
  document.getElementById("editTaskID").value = taskID;
  document.getElementById("editTaskName").value = taskName;
  document.getElementById("editTextDescription").value = taskDesc;
  document.getElementById("editAssignedTo").value = taskAssignee;
  document.getElementById("editDueDate").value = taskDate;
  document.getElementById("editTaskStatus").selected = taskStatus;
  $("#editModal").modal("show");
}

function deleteTaskClicked(event) {
  //const taskElement = event.target.closest(".task");
  var currentElement = $(this.parentElement).closest("#taskEdit")[0].getElementsByTagName("p");
  var taskID = currentElement[0].id;
  taskManager.deleteTask(taskID);
  taskManager.display();
}

function addTaskToPage(task) {
  var element = task.toHtmlElement();
  taskContainer.append(element);
}
},{"./task.js":"task.js","./taskmanager.js":"taskmanager.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49833" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script1.js"], null)
//# sourceMappingURL=/script1.71b2fc28.js.map