"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StemActivityStatRepository = void 0;
const typeorm_1 = require("typeorm");
const stemActivityStat_entity_1 = require("./stemActivityStat.entity");
let StemActivityStatRepository = class StemActivityStatRepository extends typeorm_1.Repository {
};
StemActivityStatRepository = __decorate([
    (0, typeorm_1.EntityRepository)(stemActivityStat_entity_1.StemActivityStat)
], StemActivityStatRepository);
exports.StemActivityStatRepository = StemActivityStatRepository;
//# sourceMappingURL=stemActivityStat.repository.js.map