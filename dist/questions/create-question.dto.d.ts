import { QType } from './question.entity';
export declare class CreateQuestionDto {
    id: string;
    title: string;
    category: string;
    qType: QType;
    qText: string;
    generalFeedback: string;
    tags: Array<string>;
}
