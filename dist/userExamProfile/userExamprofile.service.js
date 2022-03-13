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
exports.UserExamProfileService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const utils_1 = require("../utils/utils");
const userExamCourseProfile_repository_1 = require("./userExamCourseProfile.repository");
const userExamExamProfile_repository_1 = require("./userExamExamProfile.repository");
const userExamProfile_repository_1 = require("./userExamProfile.repository");
const moment = require("moment");
let UserExamProfileService = class UserExamProfileService {
    constructor(userExamProfileRepository, userExamCourseProfileRepository, userExamExamProfileRepository) {
        this.userExamProfileRepository = userExamProfileRepository;
        this.userExamCourseProfileRepository = userExamCourseProfileRepository;
        this.userExamExamProfileRepository = userExamExamProfileRepository;
    }
    async findCourseBasedProfileByUserID(id) {
        const [err, profile] = await (0, utils_1.to)(this.userExamProfileRepository
            .createQueryBuilder('userExamProfile')
            .leftJoinAndSelect('userExamProfile.courses', 'courses')
            .leftJoinAndSelect('courses.exams', 'exams')
            .leftJoinAndSelect('exams.examActivityStat', 'eStat')
            .where({ id: +id })
            .getOne());
        if (err)
            throw new common_1.HttpException(`Exam profile of user can not be retrieved.`, common_1.HttpStatus.SERVICE_UNAVAILABLE);
        return profile;
    }
    async manipulateProfile(user, examData) {
        const { course, exam, score } = examData;
        let [profileError, profile] = await (0, utils_1.to)(this.findCourseBasedProfileByUserID(user.id));
        if (profileError)
            throw new common_1.HttpException('Problems at retriving Profile', common_1.HttpStatus.SERVICE_UNAVAILABLE);
        const totalMark = Math.ceil(exam.singleQuestionMark * exam.questions.length);
        let examProfile = this.userExamExamProfileRepository.create({
            examId: +exam.id,
            examTitle: exam.title,
            examType: exam.type,
            attemptNumbers: 1,
            score: [],
            totalMark,
            firstAttemptTime: moment().format('YYYY-MM-DD HH:mm:ss'),
            lastAttemptTime: moment().format('YYYY-MM-DD HH:mm:ss'),
            examActivityStat: [],
        });
        let courseProfile = this.userExamCourseProfileRepository.create({
            courseId: +course.id,
            courseTitle: course.title,
            totalMark,
            totalScore: 0,
            exams: [],
        });
        if (!profile) {
            examProfile.examActivityStat.push(examData.examActivityStat);
            courseProfile.exams.push(examProfile);
            profile = this.userExamProfileRepository.create({
                id: +user.id,
                courses: [],
            });
        }
        else {
            const [courseProfileExisted] = profile.courses.filter((cour) => cour.courseId === +course.id);
            if (courseProfileExisted) {
                const [examProfileExisted] = courseProfileExisted.exams.filter((examLocal) => examLocal.examId === +exam.id);
                if (examProfileExisted) {
                    examProfileExisted.attemptNumbers++;
                    examProfileExisted.lastAttemptTime = moment().format('YYYY-MM-DD HH:mm:ss');
                    examProfileExisted.score.push(score);
                    examProfileExisted.examActivityStat.push(examData.examActivityStat);
                    const [error, result] = await (0, utils_1.to)(examProfileExisted.save());
                    console.log(error);
                    if (error)
                        throw new common_1.InternalServerErrorException();
                    return result;
                }
                else {
                    courseProfileExisted.totalMark += totalMark;
                    courseProfileExisted.totalScore =
                        +courseProfileExisted.totalScore + score;
                    examProfile.score.push(score);
                    examProfile.examActivityStat.push(examData.examActivityStat);
                    courseProfileExisted.exams.push(examProfile);
                    let [error, result] = await (0, utils_1.to)(examProfile.save());
                    if (error)
                        throw new common_1.InternalServerErrorException();
                    [error, result] = await (0, utils_1.to)(courseProfileExisted.save());
                    console.log(error);
                    if (error)
                        throw new common_1.InternalServerErrorException();
                    return result;
                }
            }
            else {
                courseProfile.exams.push(examProfile);
            }
        }
        examProfile.score.push(score);
        courseProfile.totalScore = score;
        profile.courses.push(courseProfile);
        let [error, result] = await (0, utils_1.to)(examProfile.save());
        if (error)
            throw new common_1.InternalServerErrorException();
        [error, result] = await (0, utils_1.to)(courseProfile.save());
        if (error)
            throw new common_1.InternalServerErrorException();
        [error, result] = await (0, utils_1.to)(profile.save());
        if (error)
            throw new common_1.InternalServerErrorException();
        return result;
    }
    async findAllUserCourseProfilesByCourseId(courseId) {
        const [err, userCourseProfiles] = await (0, utils_1.to)(this.userExamCourseProfileRepository.find({
            where: { courseId: +courseId },
            relations: ['userExamProfile'],
        }));
        if (err)
            throw new common_1.InternalServerErrorException();
        return userCourseProfiles;
    }
    async findAllUserExamActivityStat(stuId = 69) {
        const [err, userExamProfile] = await (0, utils_1.to)(this.userExamProfileRepository
            .createQueryBuilder('userEP')
            .leftJoinAndSelect('userEP.courses', 'courses')
            .leftJoinAndSelect('courses.exams', 'exams')
            .leftJoinAndSelect('exams.examActivityStat', 'eStat')
            .leftJoinAndSelect('eStat.questionActivityStat', 'qStat')
            .leftJoinAndSelect('qStat.stemActivityStat', 'sStat')
            .where('userEP.id = :id', { id: stuId })
            .andWhere('courses.courseId = :courseId', { courseId: 3 })
            .andWhere('exams.examId = :examId', { examId: 20 })
            .getMany());
        console.log(err);
        if (err)
            throw new common_1.InternalServerErrorException();
        return userExamProfile;
    }
    async findAllUserExamActivityStatByCourseId(stuId, courseId) {
        const [err, userExamProfile] = await (0, utils_1.to)(this.userExamProfileRepository
            .createQueryBuilder('userEP')
            .leftJoinAndSelect('userEP.courses', 'courses')
            .leftJoinAndSelect('courses.exams', 'exams')
            .leftJoinAndSelect('exams.examActivityStat', 'eStat')
            .leftJoinAndSelect('eStat.questionActivityStat', 'qStat')
            .leftJoinAndSelect('qStat.stemActivityStat', 'sStat')
            .where('userEP.id = :id', { id: stuId })
            .andWhere('courses.courseId = :courseId', { courseId: courseId })
            .getMany());
        if (err)
            throw new common_1.InternalServerErrorException();
        return userExamProfile;
    }
};
UserExamProfileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(userExamProfile_repository_1.UserExamProfileRepository)),
    __param(1, (0, typeorm_1.InjectRepository)(userExamCourseProfile_repository_1.UserExamCourseProfileRepository)),
    __param(2, (0, typeorm_1.InjectRepository)(userExamExamProfile_repository_1.UserExamExamProfileRepository)),
    __metadata("design:paramtypes", [userExamProfile_repository_1.UserExamProfileRepository,
        userExamCourseProfile_repository_1.UserExamCourseProfileRepository,
        userExamExamProfile_repository_1.UserExamExamProfileRepository])
], UserExamProfileService);
exports.UserExamProfileService = UserExamProfileService;
//# sourceMappingURL=userExamprofile.service.js.map