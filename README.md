# Terraform managed API Gateway, Lambda, and DynamoDB

Used as boilerplate code to scaffold out a small serverless AWS application using [Terraform](https://www.terraform.io) which produces API Gateway routes, Lambda functions, and a DynamoDB table - includes correlating CloudWatch Logs.

# NOTE - Creating this infrastructure may cause you to incur costs. Reference AWS pricing for more info.

## Installation

1.) You'll need an AWS account.

2.) Create an S3 bucket in your AWS account to store the Terraform generated tfstate file and the bucket name in GitHub secrets.

3.) Manually set the GitHub Actions Secrets:
`AWS_ACCESS_KEY_ID`
`AWS_ACCOUNT_ID`
`AWS_S3_BUCKET_FOR_TF_STATE`
`AWS_SECRET_ACCESS_KEY`
`GH_PERSONAL_ACCESS_TOKEN`
`IVS_PROJECT_NAME`

4.) If you're deploying the Web Application in Amplify to a desire region, you may update the value of `TF_VAR_region` in the workflow file `01-tf-amplify.yml` at the `line #6`.

5.) If you're deploying infrastructure to another or additional region to inspect the IVS Channel resources, you may update the value of `TF_VAR_region` in the workflow file `02-tf-infra.yml` at the `line #6`.

6.) Workflow `01-tf-amplify.yml` will automatically save the GitHub Actions Variable `AMPLIFY_APP_ID` which reused by another workflow `03-awscli-web.yml` for application deployment from GitHub using GitHub's `Personal Access Token`.

7.) AWS IAM user permissions required:
`Administration` permission required since various service getting deployed.

Can optionally be used with a domain name in a Hosted Zone in AWS Route 53. If you're using this repo with a domain name, rename the `domain.tf.txt` file to `domain.tf` so it's included when running the `terraform apply` command.

## Renaming Project Name

To support multiple deployments of this code (or a fork of this code) to AWS, I have littered the code with the label `yourapp` to support multiple functions, roles, and policies within the same AWS Account. Replace `yourapp` with your desired project name so you have the ability to deploy multiple versions (modified or not) of this repo within your AWS Account.

### Examples

This repo demonstrates multiple ways of serving content from Lambda, some of which may be considered unconventional (serving HTML files from Lambda). This is for simplification purposes minimizing the need for mulitple sub-domains (`www.yourdomainname.com` and `api.yourdomainname.com`) to serve static assets from one subdowmain using a CloudFront distrubution backed by and S3 bucket, and the other from API Gateway and Lambda.
