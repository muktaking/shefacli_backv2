"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_repository_1 = require("../users/user.repository");
const users_module_1 = require("../users/users.module");
const course_repository_1 = require("./course.repository");
const courses_controller_1 = require("./courses.controller");
const courses_service_1 = require("./courses.service");
let CoursesModule = class CoursesModule {
};
CoursesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([course_repository_1.CourseRepository, user_repository_1.UserRepository]),
            users_module_1.UsersModule,
        ],
        controllers: [courses_controller_1.CoursesController],
        providers: [courses_service_1.CoursesService],
        exports: [courses_service_1.CoursesService],
    })
], CoursesModule);
exports.CoursesModule = CoursesModule;
//# sourceMappingURL=courses.module.js.map