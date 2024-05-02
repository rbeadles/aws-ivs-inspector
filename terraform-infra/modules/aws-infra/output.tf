# outputs
output "rest_api_id" {
  value = aws_api_gateway_deployment.deployment.rest_api_id
}

output "wss_get_session_events_api_id" {
  value = aws_apigatewayv2_stage.stage["get-session-events"].api_id
}

output "wss_get_live_streams_api_id" {
  value = aws_apigatewayv2_stage.stage["get-live-streams"].api_id
}
