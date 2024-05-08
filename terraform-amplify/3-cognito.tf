# - USER POOL -
resource "aws_cognito_user_pool" "user_pool" {
  name = "${var.project_name}-${var.user_pool_name}"
  account_recovery_setting {
    recovery_mechanism {
      name     = "verified_email"
      priority = 1
    }
  }

  alias_attributes         = ["email"] // alows users to sign-in with either username or email address
  auto_verified_attributes = ["email"] // disable this if you set email_verification_message and subject

<<<<<<< HEAD
=======
  // enable these if auto_verified_attributes is not present
  # email_verification_message = var.email_verification_message
  # email_verification_subject = var.email_verification_subject

>>>>>>> refs/remotes/origin/dev
  admin_create_user_config {
    allow_admin_create_user_only = true
    invite_message_template {
      email_message = var.invite_email_message
      email_subject = var.invite_email_subject
      sms_message   = var.invite_sms_message
    }
  }
  password_policy {
    minimum_length    = 6
    require_lowercase = true
    require_numbers   = true
    require_symbols   = true
    require_uppercase = true
  }


  # General Schema
  dynamic "schema" {
    for_each = var.schemas == null ? [] : var.schemas
    content {
      name                     = lookup(schema.value, "name")
      attribute_data_type      = lookup(schema.value, "attribute_data_type")
      required                 = lookup(schema.value, "required")
      mutable                  = lookup(schema.value, "mutable")
      developer_only_attribute = lookup(schema.value, "developer_only_attribute")
    }
  }

  # Schema (String)
  dynamic "schema" {
    for_each = var.string_schemas == null ? [] : var.string_schemas
    content {
      name                     = lookup(schema.value, "name")
      attribute_data_type      = lookup(schema.value, "attribute_data_type")
      required                 = lookup(schema.value, "required")
      mutable                  = lookup(schema.value, "mutable")
      developer_only_attribute = lookup(schema.value, "developer_only_attribute")

      # string_attribute_constraints
      dynamic "string_attribute_constraints" {
        for_each = length(lookup(schema.value, "string_attribute_constraints")) == 0 ? [] : [lookup(schema.value, "string_attribute_constraints", {})]
        content {
          min_length = lookup(string_attribute_constraints.value, "min_length", 0)
          max_length = lookup(string_attribute_constraints.value, "max_length", 0)
        }
      }
    }
  }

  # Schema (Number)
  dynamic "schema" {
    for_each = var.number_schemas == null ? [] : var.number_schemas
    content {
      name                     = lookup(schema.value, "name")
      attribute_data_type      = lookup(schema.value, "attribute_data_type")
      required                 = lookup(schema.value, "required")
      mutable                  = lookup(schema.value, "mutable")
      developer_only_attribute = lookup(schema.value, "developer_only_attribute")

      # number_attribute_constraints
      dynamic "number_attribute_constraints" {
        for_each = length(lookup(schema.value, "number_attribute_constraints")) == 0 ? [] : [lookup(schema.value, "number_attribute_constraints", {})]
        content {
          min_value = lookup(number_attribute_constraints.value, "min_value", 0)
          max_value = lookup(number_attribute_constraints.value, "max_value", 0)
        }
      }
    }
  }


<<<<<<< HEAD
  tags = merge({ "AppName" = var.project_name }, var.tags)
=======
  tags = merge(
    {
      "AppName" = var.project_name
    },
    var.tags,
  )
>>>>>>> refs/remotes/origin/dev
}

# Cognito User Pool Client
resource "aws_cognito_user_pool_client" "user_pool_client" {
  name         = var.user_pool_client_name
  user_pool_id = aws_cognito_user_pool.user_pool.id
  # callback_urls                        = ["https://example.com"]
  # allowed_oauth_flows_user_pool_client = true
  # allowed_oauth_flows                  = ["code", "implicit"]
  # allowed_oauth_scopes         = ["email", "openid"]
  supported_identity_providers = ["COGNITO"]
}


# Cognito Identity Pool
resource "aws_cognito_identity_pool" "identity_pool" {
  identity_pool_name               = var.identity_pool_name
  allow_unauthenticated_identities = var.identity_pool_allow_unauthenticated_identites
  allow_classic_flow               = var.identity_pool_allow_classic_flow

  cognito_identity_providers {
<<<<<<< HEAD
    client_id               = aws_cognito_user_pool_client.user_pool_client.id
=======
    client_id = aws_cognito_user_pool_client.user_pool_client.id
    # provider_name           = "cognito-idp.${var.aws_region}.amazonaws.com/${aws_cognito_user_pool.user_pool.id}"
>>>>>>> refs/remotes/origin/dev
    provider_name           = "cognito-idp.${data.aws_region.current.name}.amazonaws.com/${aws_cognito_user_pool.user_pool.id}"
    server_side_token_check = false
  }
}

# Cognito Identity Pool Roles Attachments
resource "aws_cognito_identity_pool_roles_attachment" "identity_pool_auth_roles_attachment" {
  identity_pool_id = aws_cognito_identity_pool.identity_pool.id

  role_mapping {
<<<<<<< HEAD
    identity_provider         = "cognito-idp.${data.aws_region.current.id}.amazonaws.com/${aws_cognito_user_pool.user_pool.id}:${aws_cognito_user_pool_client.user_pool_client.id}"
    ambiguous_role_resolution = "Deny"
    type                      = "Rules"

=======
    identity_provider = "cognito-idp.${data.aws_region.current.id}.amazonaws.com/${aws_cognito_user_pool.user_pool.id}:${aws_cognito_user_pool_client.user_pool_client.id}"
    # ambiguous_role_resolution = "AuthenticatedRole"
    ambiguous_role_resolution = "Deny" // must be either "AuthenticatedRole" or "Deny" (case-sensitive)
    # type                      = "Token"
    type = "Rules" // either "Token" or "Rules" (case-sensitive)

    # More info on Fine-Grained access Control with Cognito Identity Pools:
    # https://www.youtube.com/watch?v=tAUmz94O2Qo
    # https://docs.aws.amazon.com/cognitoidentity/latest/APIReference/API_MappingRule.html
>>>>>>> refs/remotes/origin/dev
    mapping_rule {
      claim = "cognito:groups" // claim that is in token for cognito users in groups
      # Set this to "Contains" if users will potentially be in more than one group
      match_type = "Contains" // Valid values are "Equals", "Contains", "StartsWith", and "NotEqual"
      # role_arn   = var.create_full_access_roles ? aws_iam_role.cognito_admin_group_full_access[0].arn : aws_iam_role.cognito_admin_group_restricted_access[0].arn
      role_arn = aws_iam_role.cognito_admin_group_restricted_access[0].arn
      value    = "Admin" // group name. Claim/value = cognito:groups/Admin
    }
    mapping_rule {
      claim = "cognito:groups" // claim that is in token for cognito users in groups
      # Set this to "Contains" if users will potentially be in more than one group
      match_type = "Contains" // Valid values are "Equals", "Contains", "StartsWith", and "NotEqual"
      role_arn   = aws_iam_role.cognito_standard_group_restricted_access[0].arn
      value      = "Standard" // group name. Claim/value = cognito:groups/Standard
    }
  }

  # IAM Roles for users who are not in any groups
  roles = {
    "authenticated"   = aws_iam_role.cognito_authrole_restricted_access[0].arn
    "unauthenticated" = aws_iam_role.cognito_unauthrole_restricted_access[0].arn
  }
}

<<<<<<< HEAD
resource "aws_cognito_user" "name" {
  username     = "test"
  user_pool_id = aws_cognito_user_pool.user_pool.id

}
=======
# resource "aws_cognito_user" "name" {
#   username     = "test"
#   user_pool_id = aws_cognito_user_pool.user_pool.id

# }
>>>>>>> refs/remotes/origin/dev


# - COGNITO USERS -
# Users
resource "aws_cognito_user" "cognito_users" {
  for_each = var.cognito_users != null ? var.cognito_users : {}
  # for_each     = var.cognito_users == null ? {} : var.cognito_users
  user_pool_id = aws_cognito_user_pool.user_pool.id

  # username = each.value.email
  username = each.value.username
  attributes = {
    email          = each.value.email
    given_name     = each.value.given_name
    family_name    = each.value.family_name
    IAC_PROVIDER   = "Terraform"
    email_verified = true
  }
}

# Groups
resource "aws_cognito_user_group" "cognito_user_groups" {
  for_each     = var.cognito_groups == null ? {} : var.cognito_groups
  user_pool_id = aws_cognito_user_pool.user_pool.id
  name         = each.value.name
  description  = each.value.description
  precedence   = 1
  role_arn     = each.value.name == "Admin" ? aws_iam_role.cognito_admin_group_restricted_access[0].arn : aws_iam_role.cognito_standard_group_restricted_access[0].arn
}

# Admin User Group Association
resource "aws_cognito_user_in_group" "cognito_user_group_memberships" {
  for_each = local.users_and_their_groups
  # for_each = var.cognito_users == null ? {} : var.cognito_users
  # for_each     = var.admin_cognito_users == null ? {} : var.admin_cognito_users
  user_pool_id = aws_cognito_user_pool.user_pool.id
  group_name   = each.value.group_name
  # group_name   = [each.key].group_membership
  # group_name   = aws_cognito_user_group.admin_cognito_user_group.name
  username = each.value.username
  depends_on = [
    aws_cognito_user.cognito_users,
    aws_cognito_user_group.cognito_user_groups,
  ]
}




