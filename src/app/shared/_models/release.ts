import { UserStory } from './user-story';

export interface Release {
    guid?: string;
    name: string;
    startDate?: Date;
    endDate?: Date;
    userStories?: Array<UserStory>;
}
