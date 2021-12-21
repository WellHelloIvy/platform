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
const models_1 = __importDefault(require("../../db/models"));
const validation_1 = require("../../utils/validation");
const router = express_1.default.Router();
router.post('/', validation_1.validateAsset, (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, cryptoId, quantity } = req.body;
    const asset = yield models_1.default.Asset.create({
        userId, cryptoId, quantity
    });
    return res.json({
        asset
    });
})));
router.put('/:assetId', validation_1.validateAsset, (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const assetId = req.params.assetId;
    const asset = yield models_1.default.Asset.findByPk(assetId);
    const { userId, cryptoId, quantity } = req.body;
    asset.userId = userId;
    asset.cryptoId = cryptoId;
    asset.quantity = quantity;
    yield asset.save();
    return res.json({
        asset
    });
})));
exports.default = router;
