import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { utils } from "../utils/utils";

export interface FusionStackProps extends StackProps {
    stackName: string;
    envName: string;
    description: string;
}

export class FusionStack extends Stack {
    protected envName: string;

    constructor(scope: Construct, id: string, props: FusionStackProps) {
        super(scope, id, props);
        this.envName = props.envName ?? "dev";
    }

    protected formatedName = (name: string) => {
        return utils.formatedName(name, this.envName);
    };
}
