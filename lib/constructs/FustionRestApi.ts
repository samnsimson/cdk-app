import { Construct } from "constructs";
import { utils } from "../utils/utils";
import { RestApi } from "aws-cdk-lib/aws-apigateway";

export interface FusionRestApiProps {}

export class FusionRestApi extends Construct {
    private readonly restapi: RestApi;

    constructor(scope: Construct, id: string, props: FusionRestApiProps) {
        super(scope, utils.pascalCase(id));

        this.restapi = new RestApi(this, utils.pascalCase(id), {});
    }
}
