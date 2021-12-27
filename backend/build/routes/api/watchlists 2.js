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
const dist_1 = require("sequelize/dist");
const models_1 = __importDefault(require("../../db/models"));
const router = express_1.default.Router();
router.get('/', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const watchlists = yield models_1.default.Watchlist.findAll({
        include: { model: models_1.default.WatchlistCrypto }
    });
    return res.json(watchlists);
})));
router.post('/:watchlistId', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { watchlistId, cryptoId } = req.body;
    yield models_1.default.WatchlistCrypto.create({
        watchlistId, cryptoId
    });
    const watchlist = yield models_1.default.Watchlist.findByPk(watchlistId, {
        include: { model: models_1.default.WatchlistCrypto }
    });
    return res.json([watchlist]);
})));
router.delete('/:watchlistId/watchlistcryptos/:cryptoId', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { watchlistId, cryptoId } = req.params;
    const cryptocurrency = yield models_1.default.WatchlistCrypto.findOne({ where: {
            [dist_1.Op.and]: [
                {
                    watchlistId
                },
                {
                    cryptoId
                }
            ]
        }
    });
    yield cryptocurrency.destroy();
    const watchlist = yield models_1.default.Watchlist.findByPk(watchlistId, {
        include: { model: models_1.default.WatchlistCrypto }
    });
    return res.json([watchlist]);
})));
exports.default = router;
