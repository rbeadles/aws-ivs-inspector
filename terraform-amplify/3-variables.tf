# variable "account_id" {
#   type = string
# }

variable "region" {
  type = string
}

variable "project_name" {
  type    = string
  default = "ivs-inspector"
}

variable "environment" {
  type    = string
  default = "ivs"
}

variable "repository" {
  type        = string
  description = "Web Application Repo"
}

variable "token" {
  type        = string
  description = "github token to connect github repo"
  sensitive   = true
}

variable "branch_name" {
  type        = string
  description = "IVS Branch"
  default     = "main"
}

variable "domain_name" {
  type        = string
  default     = "awsivsinspector.com"
  description = "AWS Amplify Domain Name"
}
