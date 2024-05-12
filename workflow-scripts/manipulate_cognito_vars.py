import sys, json;

existing_env_vars = json.loads(sys.argv[1])
cognito_vars = json.loads(sys.argv[2])

print("existing env vars: ", existing_env_vars)
# print("existing env vars json: ", json.loads(existing_env_vars))
# print("existing env vars json type: ", type(json.loads(existing_env_vars)))
# print("existing env vars type: ", type(existing_env_vars))
print("cognito_vars: ", cognito_vars)
print("cognito_vars json: ", json.loads(cognito_vars))
# print("cognito_vars type: ", type(json.loads(cognito_vars)))
# print("region:", region)
# print("region type:", type(region))
 
# compiled_env_vars.update(existing_env_vars)
# print(compiled_env_vars)
existing_env_vars[region] = cognito_vars
region_keys = list(map(lambda x: x.replace("VITE_API_", ""), [k for k in existing_env_vars.keys() if "VITE_API_" in k]))

existing_env_vars["VITE_REGIONS"] = ",".join(region_keys)

print(json.dumps(existing_env_vars))

