import { InternalServerErrorException } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { UserRepository } from 'src/users/user.repository';
import { Logger } from 'winston';
import { CourseRepository } from './course.repository';
import { CreateCourseDto } from './dto/course.dto';
export declare class CoursesService {
    private readonly logger;
    private courseRepository;
    private userRepository;
    constructor(logger: Logger, courseRepository: CourseRepository, userRepository: UserRepository);
    createCourse(createCourseDto: any, imagePath: any, creator: string): Promise<{
        message: string;
        data: any;
    }>;
    findAllCourses(user?: User): Promise<any>;
    findAllRawCourses(): Promise<any>;
    findAllCoursesEnrolledByStudent(stuId: any): Promise<any>;
    findCourseById(id: string): Promise<any>;
    updateCourseById(courseUpdated: CreateCourseDto, id: string, imagePath: any): Promise<{
        message: string;
    }>;
    deleteCourseById(id: string): Promise<{
        message: string;
    }>;
    enrollmentRequestedByStudent(courseId: string, stuId: string): Promise<{
        message: string;
    }>;
    expectedEnrolledStuByCourseId(courseId: string): Promise<any>;
    expectedEnrolledStuInfo(user: User): Promise<any[]>;
    approveOrDenyEnrollment(courseId: string, stuIds: [string], deny?: boolean): Promise<{
        message: string;
    }>;
    findAllEnrolledStudentNumberByCourseId(courseId: any): Promise<number | InternalServerErrorException>;
    findAllEnrolledStudentByCourseId(courseId: any): Promise<any>;
}
