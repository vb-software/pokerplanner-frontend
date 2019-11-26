import { WorkspaceConfiguration } from './workspace-configuration';
import { Release } from './release';

export interface Workspace {
    guid?: string;
    name: string;
    configuration?: WorkspaceConfiguration;
    releses?: Array<Release>;
}
