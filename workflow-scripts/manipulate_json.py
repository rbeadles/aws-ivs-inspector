import sys, json;

existing_env_vars = json.loads(sys.argv[1])
region = sys.argv[2]
api_values = sys.argv[3]

print("existing env vars: ", existing_env_vars)
print("existing env vars type: ", type(existing_env_vars))
print("api_values: ", api_values)
 
existing_env_vars.update({[region]: api_values})

print(existing_env_vars)

