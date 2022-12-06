"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var images_1 = __importDefault(require("../../controllers/images"));
var express_validator_1 = require("express-validator");
var router = express_1.default.Router();
router.get('/api', 
// some input validation
[
    (0, express_validator_1.query)('filename', 'Please Enter a valid filename ')
        .not()
        .isEmpty()
        .trim()
        .isString(),
    (0, express_validator_1.query)('width', 'Please Enter a valid width')
        .not()
        .isEmpty()
        .toInt()
        .trim(),
    (0, express_validator_1.query)('height', 'Please Enter a file height')
        .not()
        .isEmpty()
        .toInt()
        .trim(),
], images_1.default.getImage);
exports.default = router;
