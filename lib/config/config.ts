import { Duration } from "aws-cdk-lib";

export const config = {
    lambda: {
        memorySize: 128,
        timeoutDuration: Duration.minutes(60),
    },
};
