'use strict';
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
const sequelize_1 = require("sequelize");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
module.exports = (sequelize, DataTypes) => {
    class User extends sequelize_1.Model {
        constructor() {
            super(...arguments);
            this.toSafeObject = () => {
                const { id, firstName, lastName, email, cashBalance } = this;
                return { id, firstName, lastName, email, cashBalance };
            };
            this.validatePassword = (password) => {
                return bcryptjs_1.default.compareSync(password, this.hashedPassword);
            };
        }
        static associate(models) {
            User.hasMany(models.Transaction, { foreignKey: 'userId' });
            User.hasMany(models.Asset, { foreignKey: 'userId' });
            User.hasMany(models.Watchlist, { foreignKey: 'userId' });
        }
        static getCurrentUserById(id) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield User.scope('currentUser').findByPk(id);
            });
        }
        ;
        static login({ email, password }) {
            return __awaiter(this, void 0, void 0, function* () {
                const user = yield User.scope('loginUser').findOne({
                    where: {
                        email,
                    },
                });
                if (user && user.validatePassword(password)) {
                    return yield User.scope('currentUser').findByPk(user.id);
                }
            });
        }
        static signup({ firstName, lastName, email, password }) {
            return __awaiter(this, void 0, void 0, function* () {
                const hashedPassword = bcryptjs_1.default.hashSync(password);
                const user = yield User.create({
                    firstName,
                    lastName,
                    email,
                    hashedPassword,
                    cashBalance: 0.00
                });
                return yield User.scope('currentUser').findByPk(user.id);
            });
        }
    }
    ;
    User.init({
        id: {
            allowNull: false,
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true
            },
        },
        hashedPassword: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cashBalance: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        }
    }, {
        defaultScope: {
            attributes: {
                exclude: ['email', 'hashedPassword', 'cashBalance', 'createdAt', 'updatedAt']
            }
        },
        scopes: {
            currentUser: {
                attributes: { exclude: ['hashedPassword'] },
            },
            loginUser: {
                attributes: { exclude: [] },
            },
        },
        sequelize,
        modelName: 'User',
    });
    return User;
};
