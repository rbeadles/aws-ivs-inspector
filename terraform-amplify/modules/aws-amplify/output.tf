output "amplify_app_url" {
  value = aws_amplify_domain_association.domain_association.domain_name
}

output "amplify_app_arn" {
  value = aws_amplify_app.amplify_app.arn
}
