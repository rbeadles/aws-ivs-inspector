output "api_ids" {
  value = {
    "${var.region}" : jsonencode({
      rest : module.aws-infra.rest_api_id,
      wss_get_session_events : module.aws-infra.wss_get_session_events_api_id,
      wss_get_live_streams : module.aws-infra.wss_get_live_streams_api_id
    })
  }
}

# locals {
#   api_ids_jsonencode = jsonencode({
#     rest : module.aws-infra.rest_api_id,
#     wss_get_session_events : module.aws-infra.wss_get_session_events_api_id,
#     wss_get_live_streams : module.aws-infra.wss_get_live_streams_api_id
#   })
# }
