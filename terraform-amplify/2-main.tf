module "aws-infra" {
  source       = "./modules/aws-infra"
  project_name = var.project_name
  environment  = var.environment
  account_id   = var.account_id
  region       = var.region
  token        = var.token
}
