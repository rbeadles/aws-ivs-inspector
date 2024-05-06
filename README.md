# NOTE - Creating this infrastructure may cause you to incur costs. Reference AWS pricing for more info.

:TODO: Provide an overview and benefits of this project.

## Installation

1.) AWS Account & Permissions: You'll need an AWS account and the IAM user permissions with `AdministratorAccess` policy required

#### Please note, since various service getting deployed, the AdministratorAccess would make it easy, however, we recommend to delete or disable the user or remove the policy from the user upon deployment complete. You would only require access for deployment.

:TODO: AdministratorAccess policy to be refined.

2.) Create an S3 bucket in your AWS account to store the Terraform generated tfstate file and the bucket name in GitHub secrets.

3.) GitHub Permissions: Generate the GitHub personal token under user profile https://github.com/settings/tokens
![alt text](https://github.com/sathia-s/aws-ivs-inspector/blob/main/prequisites/01-PersonalAccessToken-using-Classic.png?raw=true)

Assign the following permission and save.
![alt text](https://github.com/sathia-s/aws-ivs-inspector/blob/main/prequisites/02-AddFollowingPermissions.png?raw=true)

4.) Repository Workflow Permission:
![alt text](https://github.com/sathia-s/aws-ivs-inspector/blob/main/prequisites/05-ProvideWorkflowPermissions.png?raw=true)

5.) Manually set the GitHub Actions Secrets:
`AWS_ACCESS_KEY_ID`
`AWS_ACCOUNT_ID`
`AWS_S3_BUCKET_FOR_TF_STATE`
`AWS_SECRET_ACCESS_KEY`
`GH_PERSONAL_ACCESS_TOKEN`
`IVS_PROJECT_NAME`

![alt text](https://github.com/sathia-s/aws-ivs-inspector/blob/main/prequisites/03-AddNewEnvironment.png?raw=true)
![alt text](https://github.com/sathia-s/aws-ivs-inspector/blob/main/prequisites/04-AddSecerts.png?raw=true)

6.) If you're hosting the Web Application using Amplify to a desire region, you may update the value of `TF_VAR_region` in the workflow file `01-tf-amplify.yml` at the `line #6`.

7.) If you're deploying infrastructure to another or additional region to inspect the IVS Channel resources, you may update the value of `TF_VAR_region` in the workflow file `02-tf-infra.yml` at the `line #6` for each run/region.

8.) Workflow `01-tf-amplify.yml` will automatically save the GitHub Actions Variable `AMPLIFY_APP_ID` which reused by another workflow `03-awscli-web.yml` for application deployment from GitHub using GitHub's `Personal Access Token`.

## Renaming Project Name

The default project name `ivs-inspector` inherits in the repository/project, if you wish to change, you may do so by changing the value of the secret variable `IVS_PROJECT_NAME` under secrets tab found in the GitHub > Repository > `Settings` > `Secrets and variables` > `Actions`.

### Web Application access

Upon successful run of all three workflows 01, 02, 03,

1. navigate to AWS Console,
2. switch to the region the web application deployed,
3. select Amplify service,
4. select/enter the IVS Inspector App,
5. under overview > Production branch click the Domain, basically thats the URL of the monitoring application.

:TODO: Provide details on how to use the web application.

:TODO: Question to the IVS team,

1. should we consider duplicating the #02 workflow, for multiple region deployment or advise the customer's to rename the region from the existing file. Please refer the #5 in the installation.

2. shall I decouple by moving the web application to a separate branch (say ivs) and keep the terraform folders & github workflows in the main branch to avoid clutter and the branches specific to the behaviour.
