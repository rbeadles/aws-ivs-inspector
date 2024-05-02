variable "account_id" {
  type = string
}

variable "region" {
  type = string
}

variable "project_name" {
  type = string
}

variable "environment" {
  type    = string
  default = "ivs"
}

variable "token" {
  type        = string
  description = "github token to connect github repo"
  sensitive   = true
}

variable "repository" {
  type        = string
  description = "AWS IVS Inspector Web Application Repo"
  default     = "https://github.com/sathia-s/aws-ivs-inspector-web-public"
}

variable "branch_name" {
  type        = string
  description = "AWS IVS Inspector IVS Branch"
  default     = "ivs"
}

variable "domain_name" {
  type        = string
  default     = "awsivsinspector.com"
  description = "AWS Amplify Domain Name"
}
