#!/bin/bash

region="us-east-1"
api_id="123"
path=../../src/assets/envVars.json
tmp=$(mktemp)

# jq fromjson <<< "{ap-south-1:{rest:5t4nrs7xgh,wss_get_live_streams:2chsf8r71h,wss_get_session_events:h00ryvk3gf}}"

# jq --arg region "$region" --arg api "rest" --arg id "$api_id" '.apis[$region][$api] = $id' $path > "$tmp" && mv "$tmp" $path

# cat $path

payload="{"ap-south-1":{"rest":"5t4nrs7xgh","wss_get_live_streams":"2chsf8r71h","wss_get_session_events":"h00ryvk3gf"}}"

echo $payload > test.json

cat test.json

# jq -r '.' <<< "{"ap-south-1":{"rest":"5t4nrs7xgh","wss_get_live_streams":"2chsf8r71h","wss_get_session_events":"h00ryvk3gf"}}"

# jq -rc . <<< "{"ap-south-1":{"rest":"5t4nrs7xgh","wss_get_live_streams":"2chsf8r71h","wss_get_session_events":"h00ryvk3gf"}}"

# jq --arg region "$region" --arg apis "{"ap-south-1":{"rest":"5t4nrs7xgh","wss_get_live_streams":"2chsf8r71h","wss_get_session_events":"h00ryvk3gf"}}" '.apis = $apis' "$path" > "$tmp"

# jq --arg region "$region" --arg apis "{"ap-south-1":{"rest":"5t4nrs7xgh","wss_get_live_streams":"2chsf8r71h","wss_get_session_events":"h00ryvk3gf"}}" '.apis = $apis' "$path" > "$tmp"

# cat "$tmp"
