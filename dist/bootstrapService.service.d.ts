import { OnApplicationBootstrap } from "@nestjs/common";
export declare class BootstrapService implements OnApplicationBootstrap {
    onApplicationBootstrap(): Promise<void>;
}
