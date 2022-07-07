/* eslint-disable */
let awsmobile = {
  "aws_cognito_region": "ap-northeast-2",
  "aws_user_pools_id": "ap-northeast-2_yxgsTV7nz",
  "aws_user_pools_web_client_id": "753id3h0lalmkjso92oqobnt42"
};
if (process.env.REACT_APP_ENV === 'prod') {
  const cfg = {
    "aws_cognito_region": "eu-central-1",
    "aws_user_pools_id": "eu-central-1_tclcgY5pK",
    "aws_user_pools_web_client_id": "44mm0m8garlsuemvkfoih9ch1f"
  };
  awsmobile = cfg;
}

export default awsmobile;
