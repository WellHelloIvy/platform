"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const session_1 = __importDefault(require("./session"));
const users_1 = __importDefault(require("./users"));
const transactions_1 = __importDefault(require("./transactions"));
const assets_1 = __importDefault(require("./assets"));
const watchlists_1 = __importDefault(require("./watchlists"));
const router = express_1.default.Router();
router.use('/session', session_1.default);
router.use('/users', users_1.default);
router.use('/transactions', transactions_1.default);
router.use('/assets', assets_1.default);
router.use('/watchlists', watchlists_1.default);
exports.default = router;
