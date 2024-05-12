# create cloudwatch log group for lambda
resource "aws_amplify_app" "app" {
  name         = "aws-${var.project_name}"
  repository   = var.repository
  access_token = var.token

  build_spec = var.path_to_build_spec != null ? file("${path.root}/${var.path_to_build_spec}") : file("${path.root}/../amplify.yml")

  # enable_auto_branch_creation   = var.enable_auto_branch_creation
  # enable_branch_auto_deletion   = var.enable_auto_branch_deletion
  # auto_branch_creation_patterns = var.auto_branch_creation_patterns // default is just main
  # auto_branch_creation_config {
  #   enable_auto_build           = var.enable_auto_build
  #   enable_pull_request_preview = var.enable_amplify_app_pr_preview
  #   enable_performance_mode     = var.enable_performance_mode
  #   framework                   = var.framework
  # }

  # environment_variables = {
  #   REGION           = var.region
  #   USER_POOL_ID     = "${aws_cognito_user_pool.user_pool.id}"
  #   IDENTITY_POOL_ID = "${aws_cognito_identity_pool.identity_pool.id}"
  #   APP_CLIENT_ID    = "${aws_cognito_user_pool_client.user_pool_client.id}"
  # }

  # The default rewrites and redirects added by the Amplify Console.
  custom_rule {
    source = "/<*>"
    status = "404"
    target = "/index.html"
  }

  # depends_on = [
  #   aws_cognito_user_pool.user_pool,
  #   aws_cognito_identity_pool.identity_pool,
  #   aws_cognito_user_pool_client.user_pool_client
  # ]
}

resource "aws_amplify_branch" "branch" {
  app_id      = aws_amplify_app.app.id
  branch_name = var.branch_name
  framework   = "Vue"
  stage       = "PRODUCTION"
}

