variable "account_id" {
  type = string
}

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
