"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const auth_1 = require("../../utils/auth");
const models_1 = __importDefault(require("../../db/models"));
const validation_1 = require("../../utils/validation");
const router = express_1.default.Router();
router.post('/', validation_1.validateSignup, (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password } = req.body;
    const user = yield models_1.default.User.signup({ firstName, lastName, email, password });
    yield (0, auth_1.setTokenCookie)(res, user);
    yield models_1.default.Watchlist.createWatchlist(user.id);
    return res.json({
        user
    });
})));
router.get('/:userId/transactions', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const transactions = yield models_1.default.Transaction.findAll({
        where: { userId }
    });
    return res.json(transactions);
})));
router.get('/:userId/assets', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const assets = yield models_1.default.Asset.findAll({
        where: { userId }
    });
    return res.json(assets);
})));
router.get('/:userId/watchlists', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const watchlists = yield models_1.default.Watchlist.findAll({
        where: { userId },
        include: { model: models_1.default.WatchlistCrypto }
    });
    return res.json(watchlists);
})));
exports.default = router;
