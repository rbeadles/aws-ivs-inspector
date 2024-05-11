import sys, json;

existing_env_vars = json.loads(json.loads(sys.argv[1]))
region = sys.argv[2]
api_values = sys.argv[3]
existing_env_vars[region] = api_values

print(existing_env_vars)
