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
exports.PostexamsController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const get_answers_dto_1 = require("./dto/get-answers.dto");
const answer_validation_pipe_1 = require("./pipe/answer-validation.pipe");
const postexams_service_1 = require("./postexams.service");
let PostexamsController = class PostexamsController {
    constructor(postexamsService) {
        this.postexamsService = postexamsService;
    }
    async postExamTasking(getAnswersDto, answers, req) {
        return await this.postexamsService.postExamTaskingByCoursesProfile(getAnswersDto, answers, req.user);
    }
    async postExamTaskingForFree(getFreeAnswersDto, answers) {
        return await this.postexamsService.postExamTaskingForFree(getFreeAnswersDto, answers);
    }
    async examRankByIdForGuest(data) {
        return await this.postexamsService.examRankByIdConstrainByCourseId(data.id, data.courseId);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Body)('answers', answer_validation_pipe_1.AnswerValidationPipe)),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_answers_dto_1.GetAnswersDto, Array, Object]),
    __metadata("design:returntype", Promise)
], PostexamsController.prototype, "postExamTasking", null);
__decorate([
    (0, common_1.Post)('free'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Body)('answers', answer_validation_pipe_1.AnswerValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_answers_dto_1.GetFreeAnswersDto, Array]),
    __metadata("design:returntype", Promise)
], PostexamsController.prototype, "postExamTaskingForFree", null);
__decorate([
    (0, common_1.Post)('rank/:id'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PostexamsController.prototype, "examRankByIdForGuest", null);
PostexamsController = __decorate([
    (0, common_1.Controller)('postexams'),
    __metadata("design:paramtypes", [postexams_service_1.PostexamsService])
], PostexamsController);
exports.PostexamsController = PostexamsController;
//# sourceMappingURL=postexams.controller.js.map