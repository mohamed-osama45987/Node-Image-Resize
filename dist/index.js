"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var index_1 = __importDefault(require("./routers/index"));
var image_1 = __importDefault(require("./routers/api/image"));
var app = (0, express_1.default)();
var port = 3000;
app.use(express_1.default.static('/assets'));
app.use(index_1.default);
app.use(image_1.default);
app.listen(port, function () {
    console.log("App is started at http://localhost:".concat(port));
});
