# create cloudwatch log group for lambda
resource "aws_amplify_app" "app" {
  name                     = "aws-${var.project_name}"
  repository               = var.repository
  access_token             = var.token

  # The default build_spec added by the Amplify Console for React.
  build_spec = <<-EOT
    version: 0.1
    frontend:
      phases:
        build:
          commands:
            - cd web-application
            - npm i
            - npm run build
      artifacts:
        baseDirectory: dist/spa
        files:
          - '**/*'
      cache:
        paths:
          - node_modules/**/*
  EOT

  # The default rewrites and redirects added by the Amplify Console.
  custom_rule {
    source = "/<*>"
    status = "404"
    target = "/index.html"
  }
}

resource "aws_amplify_branch" "branch" {
  app_id            = aws_amplify_app.app.id
  branch_name       = var.branch_name
  framework         = "Vue"
  stage             = "PRODUCTION"
}

