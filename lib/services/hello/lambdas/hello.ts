import { Handler } from "aws-cdk-lib/aws-lambda";
import { APIGatewayProxyEvent, Context } from "aws-lambda";

export const handler: Handler = async (event: APIGatewayProxyEvent, context: Context) => {
    console.log("🚀 ~ consthandler:Handler= ~ context:", context);
    return { statusCode: 200, data: JSON.stringify(event) };
};
