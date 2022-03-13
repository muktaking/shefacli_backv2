"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutineController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const roles_decorator_1 = require("../roles.decorator");
const user_entity_1 = require("../users/user.entity");
const addASyllabus_dto_1 = require("./addASyllabus.dto");
const routine_service_1 = require("./routine.service");
let RoutineController = class RoutineController {
    constructor(routineService) {
        this.routineService = routineService;
    }
    async getRoutine() {
        return await this.routineService.getRoutine();
    }
    async getRoutineByCourseId(id) {
        return await this.routineService.getRoutineByCourseId(id);
    }
    async getRawRoutine() {
        return await this.routineService.getRawRoutine();
    }
    async getSyllabusById(id) {
        return await this.routineService.getSyllabusById(id);
    }
    async addASyllabus(addASyllabus) {
        return await this.routineService.addASyllabus(addASyllabus);
    }
    async editASyllabus(addASyllabus) {
        return await this.routineService.editASyllabus(addASyllabus);
    }
    async deleteASyllabus(id) {
        return await this.routineService.deleteASyllabus(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RoutineController.prototype, "getRoutine", null);
__decorate([
    (0, common_1.Get)('/course/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RoutineController.prototype, "getRoutineByCourseId", null);
__decorate([
    (0, common_1.Get)('/raw'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RoutineController.prototype, "getRawRoutine", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RoutineController.prototype, "getSyllabusById", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, roles_decorator_1.Role)(user_entity_1.RolePermitted.moderator),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [addASyllabus_dto_1.AddASyllabusDto]),
    __metadata("design:returntype", Promise)
], RoutineController.prototype, "addASyllabus", null);
__decorate([
    (0, common_1.Put)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, roles_decorator_1.Role)(user_entity_1.RolePermitted.moderator),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [addASyllabus_dto_1.AddASyllabusDto]),
    __metadata("design:returntype", Promise)
], RoutineController.prototype, "editASyllabus", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, roles_decorator_1.Role)(user_entity_1.RolePermitted.moderator),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RoutineController.prototype, "deleteASyllabus", null);
RoutineController = __decorate([
    (0, common_1.Controller)('routine'),
    __metadata("design:paramtypes", [routine_service_1.RoutineService])
], RoutineController);
exports.RoutineController = RoutineController;
//# sourceMappingURL=routine.controller.js.map