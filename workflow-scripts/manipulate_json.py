import sys, json;

existing_env_vars = json.loads(sys.argv[1])
region = sys.argv[2]
api_values = sys.argv[3]

# print("existing env vars: ", existing_env_vars)
# print("existing env vars json: ", json.loads(existing_env_vars))
# print("existing env vars json type: ", type(json.loads(existing_env_vars)))
# print("existing env vars type: ", type(existing_env_vars))
print("api_values: ", api_values)
print("api_values type: ", type(api_values))
print("api_values json: ", json.loads(api_values))
print("api_values json type: ", type(json.loads(api_values)))
# print("region:", region)
# print("region type:", type(region))
 
# compiled_env_vars.update(existing_env_vars)
# print(compiled_env_vars)
existing_env_vars[region] = api_values


# print(existing_env_vars)
print(json.dumps(existing_env_vars))

