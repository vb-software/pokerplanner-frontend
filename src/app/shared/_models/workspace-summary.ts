export interface WorkspaceSummary {
    guid: string;
    name: string;
    hideUserVotes: boolean;
    allowRevotes: boolean;
    usersCount: number;
    releasesCount: number;
    averageScore: number;
    scoreSystem: string;
}
