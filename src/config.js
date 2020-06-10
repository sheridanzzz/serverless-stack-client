export default {
	MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    REGION: "us-east-1",
    BUCKET: "tagstoreimageupload"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://p1o4zvmoe3.execute-api.us-east-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_9mhvG5fhJ",
    APP_CLIENT_ID: "5alod2rebtafa6lp2720uq2agv",
    IDENTITY_POOL_ID: "us-east-1:b60f49d2-1ab3-4785-b2cb-42ad07e303bc"
  }
};