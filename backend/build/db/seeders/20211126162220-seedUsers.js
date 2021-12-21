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
const bcrypt = require('bcryptjs');
module.exports = {
    up: (queryInterface, Sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        yield queryInterface.bulkInsert('Users', [
            {
                firstName: 'Demo',
                lastName: 'User',
                email: 'demo@user.com',
                hashedPassword: bcrypt.hashSync('abc123', 10),
                cashBalance: 10.00,
            },
            {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john@gmail.com',
                hashedPassword: bcrypt.hashSync('abc123', 10),
                cashBalance: 10.00,
            }
        ], {});
    }),
    down: (queryInterface, Sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        yield queryInterface.bulkDelete('Users', null, {});
    })
};
